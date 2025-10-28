exports.handler = async () => {
  if (process.env.DEPLOY_CONTEXT === 'production') {
    return { statusCode: 404, body: 'Not found' };
  }
  const envs = ['EMAIL_ADMIN','SENDGRID_API_KEY','GEMINI_API_KEY','STRIPE_SECRET_KEY','STRIPE_WEBHOOK_SECRET'];
  const present = envs.reduce((acc, k) => { acc[k] = Boolean(process.env[k]); return acc; }, {});
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true, envPresent: present }),
  };
};
