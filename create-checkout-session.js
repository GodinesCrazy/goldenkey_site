const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Solo permitimos peticiones POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { plan, email, currency, ...metadata } = data;
    const validCurrencies = ['usd', 'eur'];
    const selectedCurrency = validCurrencies.includes(currency) ? currency : 'usd';

    const plans = {
      pro: {
        name: 'Informe Pro - Niche Finder GPT',
        description: 'Análisis completo con 5-10 nichos validados, buyer persona, plan de contenidos y estrategias de monetización.',
        prices: {
          usd: 2900, // 29.00 USD
          eur: 2700, // 27.00 EUR
        }
      },
      premium: {
        name: 'Premium Kit - Niche Finder GPT',
        description: 'Todo lo del plan Pro, más un starter kit con plantillas, checklist de lanzamiento y una hora de consultoría.',
        prices: {
          usd: 7900, // 79.00 USD
          eur: 7400, // 74.00 EUR
        }
      },
    };

    const selectedPlan = plans[plan];

    if (!selectedPlan) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Plan no válido.' }) };
    }

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
      metadata: { ...metadata, plan }, // Guardamos los datos y el plan en los metadatos
      success_url: `${process.env.URL}/niche-finder/thanks.html?pro=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/niche-finder/pricing.html`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al crear la sesión de pago.' }),
    };
  }
};