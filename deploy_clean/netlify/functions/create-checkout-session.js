const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Solo permitimos peticiones POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Falta STRIPE_SECRET_KEY en variables de entorno.' }) };
    }

    const data = JSON.parse(event.body || '{}');
    const { plan, email, currency, ...metadata } = data;

    // Validación de entrada básica
    if (!email || !plan) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Faltan campos requeridos: email y plan.' }) };
    }

    const validCurrencies = ['usd', 'eur'];
    const selectedCurrency = validCurrencies.includes((currency || '').toLowerCase()) ? currency.toLowerCase() : 'usd';

    // Catálogo de productos
    const plans = {
      pro: {
        name: 'Informe Pro - Niche Finder GPT',
        description: 'Análisis completo con 5-10 nichos validados, buyer persona, plan de contenidos y estrategias de monetización.',
        prices: { usd: 2900, eur: 2700 },
      },
      premium: {
        name: 'Premium Kit - Niche Finder GPT',
        description: 'Todo lo del plan Pro, más un starter kit con plantillas, checklist de lanzamiento y una hora de consultoría.',
        prices: { usd: 7900, eur: 7400 },
      },
    };

    const selectedPlan = plans[plan];
    if (!selectedPlan) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Plan no válido.' }) };
    }

    // URL base robusta para entornos donde URL no está definida
    const proto = (event.headers && (event.headers['x-forwarded-proto'] || event.headers['X-Forwarded-Proto'])) || 'https';
    const host = (event.headers && (event.headers.host || event.headers.Host)) || 'goldenkeystudios.netlify.app';
    const baseUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL || `${proto}://${host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: selectedCurrency,
            product_data: { name: selectedPlan.name, description: selectedPlan.description },
            unit_amount: selectedPlan.prices[selectedCurrency],
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      metadata: { ...metadata, plan },
      success_url: `${baseUrl}/thanks.html?pro=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing.html`,
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };

  } catch (error) {
    console.error('Error creating Stripe session:', error);
    const message = (error && error.message) || 'Error al crear la sesión de pago.';
    return { statusCode: 500, body: JSON.stringify({ error: message }) };
  }
};
