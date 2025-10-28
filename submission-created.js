const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const sgMail = require('@sendgrid/mail');

// Load environment variables if running locally
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// --- Configuration ---
const { GEMINI_API_KEY, SENDGRID_API_KEY, EMAIL_ADMIN } = process.env;

if (!GEMINI_API_KEY || !SENDGRID_API_KEY || !EMAIL_ADMIN) {
  console.error("Missing required environment variables.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
sgMail.setApiKey(SENDGRID_API_KEY);

/**
 * Replaces placeholders in a template string with values from a data object.
 * @param {string} template The template string with {{key}} placeholders.
 * @param {object} data The object containing replacement values.
 * @returns {string} The processed string.
 */
const fillTemplate = (template, data) => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => data[key] || match);
};

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

    // 1. Construct the prompt for the AI
    const systemPromptTemplate = fs.readFileSync(path.resolve(__dirname, '../../automations/prompt_niche.txt'), 'utf-8');
    const userPrompt = fillTemplate(systemPromptTemplate, {
      sector: formData.sector || 'any',
      region: formData.region || 'any',
      skills: formData['skills[]'] ? formData['skills[]'].join(', ') : 'not specified',
      budget: formData.budget || 'not specified',
      constraints: formData.constraints || 'none'
    });

    // 2. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const aiReportText = response.text();

    // Extract the HTML block from the response for the email body
    // This assumes the AI returns a block of HTML within ```html ... ```
    const htmlMatch = aiReportText.match(/```html([\s\S]*?)```/);
    const emailHtmlBody = htmlMatch ? htmlMatch[1] : `<pre>${aiReportText}</pre>`;

    // 3. Send the email using SendGrid
    const emailTemplate = fs.readFileSync(path.resolve(__dirname, '../../automations/email_templates/entrega_free.md'), 'utf-8');
    const emailTextBody = fillTemplate(emailTemplate, { nombre: '' }); // Assuming name is not collected

    const msg = {
      to: userEmail,
      from: `GoldenKey Studios <${EMAIL_ADMIN}>`, // Use a verified sender email in SendGrid
      bcc: EMAIL_ADMIN,
      subject: 'Tu Informe de Nicho Gratuito de GoldenKey Studios',
      text: emailTextBody,
      html: `
        <p>Hola,</p>
        <p>¡Gracias por usar Niche Finder GPT! Aquí tienes tu informe:</p>
        <hr>
        ${emailHtmlBody}
        <hr>
        <p>Si quieres un análisis más profundo con 5-10 nichos, un plan de contenidos y estrategias de monetización, considera nuestro <a href="https://goldenkeystudios.netlify.app/niche-finder/pricing.html">Informe Pro</a>.</p>
        <p>¡Mucha suerte con tu proyecto!</p>
        <p>-- El equipo de GoldenKey Studios</p>
      `,
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Report generated and sent successfully.' }),
    };

  } catch (error) {
    console.error('Function execution error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An internal error occurred.' }),
    };
  }
};