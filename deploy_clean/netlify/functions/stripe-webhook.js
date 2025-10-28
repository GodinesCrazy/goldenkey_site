const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const sgMail = require('@sendgrid/mail');

// --- Configuration ---
const {
  GEMINI_API_KEY,
  SENDGRID_API_KEY,
  EMAIL_ADMIN,
  STRIPE_WEBHOOK_SECRET
} = process.env;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
sgMail.setApiKey(SENDGRID_API_KEY);

const fillTemplate = (template, data) => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => data[key] || match);
};

exports.handler = async ({ body, headers }) => {
  try {
    // 1. Verify the webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      STRIPE_WEBHOOK_SECRET
    );

    // 2. Handle only the 'checkout.session.completed' event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // 3. Retrieve customer email and form data from metadata
      const customerEmail = session.customer_details.email;
      const formData = session.metadata;
      const planName = formData.plan === 'premium' ? 'Premium Kit' : 'Informe Pro';

      if (!customerEmail) {
        console.error('Customer email not found in session.');
        return { statusCode: 400, body: 'Email not found.' };
      }

      // 4. Construct the prompt for the AI using metadata
      const systemPromptTemplate = fs.readFileSync(path.resolve(__dirname, '../../automations/prompt_niche.txt'), 'utf-8');
      const userPrompt = fillTemplate(systemPromptTemplate, {
        sector: formData.sector || 'general business',
        region: formData.region || 'global',
        skills: formData.skills || 'not specified',
        budget: formData.budget || 'not specified',
        constraints: formData.constraints || 'none'
      });

      // 5. Call the Gemini API to generate the Pro report
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(userPrompt);
      const response = await result.response;
      const aiReportText = response.text();

      const htmlMatch = aiReportText.match(/```html([\s\S]*?)```/);
      const emailHtmlBody = htmlMatch ? htmlMatch[1] : `<pre>${aiReportText}</pre>`;

      // 6. Send the email with the Pro report
      const emailTemplate = fs.readFileSync(path.resolve(__dirname, '../../automations/email_templates/entrega_pro.md'), 'utf-8');
      const emailTextBody = fillTemplate(emailTemplate, { nombre: '' });

      const msg = {
        to: customerEmail,
        from: `GoldenKey Studios <${EMAIL_ADMIN}>`,
        bcc: EMAIL_ADMIN,
        subject: `Tu ${planName} de GoldenKey Studios está listo`,
        text: emailTextBody,
        html: `
          <p>Hola,</p>
          <p>¡Gracias por comprar el ${planName}! Aquí tienes tu análisis completo:</p>
          <hr>
          ${emailHtmlBody}
          <hr>
          <p>Si tienes cualquier duda, no dudes en responder a este correo.</p>
          <p>-- El equipo de GoldenKey Studios</p>
        `,
      };

      await sgMail.send(msg);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };

  } catch (err) {
    console.error(`Stripe webhook failed: ${err.message}`);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
};

