const express = require('express');
const path = require('path');
const app = express();
app.disable('x-powered-by');
app.get('/healthz', (_req, res) => res.send('ok'));
// Códigos de acesso: defina CODIGOS na Render, separados por vírgula (ex: MK-7391,MK-2285)
const codigos = () => (process.env.CODIGOS || '').split(',').map(c => c.trim().toUpperCase()).filter(Boolean);
app.get('/api/validar', (req, res) => {
  const c = String(req.query.c || '').trim().toUpperCase();
  res.json({ ok: !!c && codigos().includes(c) });
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h' }));
app.get('/robots.txt', (_req, res) => res.type('text/plain').send('User-agent: *\nAllow: /\n'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Mukanda a correr na porta ' + port));
