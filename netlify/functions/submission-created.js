const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const sgMail = require('@sendgrid/mail');

// Load environment variables if running locally
if (process.env.NODE_ENV !== 'production') {
  try { require('dotenv').config(); } catch (_) {}
}

// --- Configuration ---
const { GEMINI_API_KEY, SENDGRID_API_KEY, EMAIL_ADMIN } = process.env;

if (!GEMINI_API_KEY || !SENDGRID_API_KEY || !EMAIL_ADMIN) {
  console.error('Missing required environment variables.');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
sgMail.setApiKey(SENDGRID_API_KEY);

// Replace {{placeholders}} in templates
const fillTemplate = (template, data) => template.replace(/\{\{(\w+)\}\}/g, (m, k) => data[k] || m);

exports.handler = async (event) => {
  try {
    const { payload } = JSON.parse(event.body);

    // Only process submissions from the 'niche-quiz' form
    if (payload.form_name !== 'niche-quiz') {
      return { statusCode: 200, body: 'Not a niche-quiz submission. Skipping.' };
    }

    const formData = payload.data;
    const userEmail = formData.email;

    if (!userEmail) {
      return { statusCode: 400, body: 'Email is missing from form data.' };
    }

    // 1) Build prompt from template
    const systemPromptTemplate = fs.readFileSync(path.resolve(__dirname, '../../automations/prompt_niche.txt'), 'utf-8');
    const userPrompt = fillTemplate(systemPromptTemplate, {
      sector: formData.sector || 'any',
      region: formData.region || 'any',
      skills: Array.isArray(formData['skills[]']) ? formData['skills[]'].join(', ') : (formData['skills[]'] || 'not specified'),
      budget: formData.budget || 'not specified',
      constraints: formData.constraints || 'none',
    });

    // 2) Call Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const aiReportText = response.text();

    // Try to extract HTML block
    const htmlMatch = aiReportText.match(/```html([\s\S]*?)```/);
    const emailHtmlBody = htmlMatch ? htmlMatch[1] : `<pre>${aiReportText}</pre>`;

    // 3) Send email
    const emailTemplate = fs.readFileSync(path.resolve(__dirname, '../../automations/email_templates/entrega_free.md'), 'utf-8');
    const emailTextBody = fillTemplate(emailTemplate, { nombre: '' });

    const msg = {
      to: userEmail,
      from: `GoldenKey Studios <${EMAIL_ADMIN}>`,
      bcc: EMAIL_ADMIN,
      subject: 'Tu Informe de Nicho Gratuito de GoldenKey Studios',
      text: emailTextBody,
      html: `
        <p>Hola,</p>
        <p>¡Gracias por usar Niche Finder GPT! Aquí tienes tu informe:</p>
        <hr>
        ${emailHtmlBody}
        <hr>
        <p>Si quieres un análisis más profundo con 5-10 nichos, un plan de contenidos y estrategias de monetización, considera nuestro <a href="https://goldenkeystudios.netlify.app/pricing.html">Informe Pro</a>.</p>
        <p>— El equipo de GoldenKey Studios</p>
      `,
    };

    await sgMail.send(msg);

    return { statusCode: 200, body: JSON.stringify({ message: 'Report generated and sent successfully.' }) };
  } catch (error) {
    console.error('Function execution error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'An internal error occurred.' }) };
  }
};

