# Automatización de Niche Finder GPT

Este servicio está automatizado usando **Netlify Functions**. El proceso es el siguiente:
1.  Un usuario envía el formulario `niche-quiz`.
2.  Netlify detecta el envío y dispara la función `submission-created.js`.
3.  La función llama a la API de Google Gemini para generar el informe.
4.  La función envía el informe al usuario por correo electrónico a través de SendGrid.

## Requisitos

- Una cuenta en Netlify con el sitio desplegado.
- Una clave de API de Google Gemini.
- Una clave de API de SendGrid y un remitente verificado.

## Configuración de Variables de Entorno

Para que la función se ejecute correctamente, debes configurar las siguientes variables de entorno en el panel de tu sitio en Netlify (`Site settings > Build & deploy > Environment`):

- `GEMINI_API_KEY`: Tu clave de API de Google Gemini.
- `SENDGRID_API_KEY`: Tu clave de API de SendGrid.
- `EMAIL_ADMIN`: Tu correo electrónico, donde recibirás una copia de cada informe enviado.
- `STRIPE_SECRET_KEY`: Tu clave secreta de Stripe (ej. `sk_test_...`).
- `STRIPE_WEBHOOK_SECRET`: El secreto de tu endpoint de webhook de Stripe (ej. `whsec_...`).
- `URL`: La URL principal de tu sitio (Netlify la establece automáticamente, ej. `https://goldenkeystudios.netlify.app`).

Una vez desplegado el sitio con estas variables configuradas, el flujo será 100% automático.

## Configuración del Webhook de Stripe

1.  Ve a tu panel de Stripe > Desarrolladores > Webhooks.
2.  Haz clic en "Añadir un endpoint".
3.  En "URL del endpoint", introduce: `https://<tu-dominio>.netlify.app/.netlify/functions/stripe-webhook`.
4.  En "Eventos para enviar", selecciona `checkout.session.completed`.
5.  Copia el "Secreto de firma" del webhook y añádelo como la variable de entorno `STRIPE_WEBHOOK_SECRET` en Netlify.