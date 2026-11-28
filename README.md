# Mukanda (site estático, grátis e sem espera)

Só programação pura: HTML, CSS e JavaScript. Sem servidor, sem base de dados, sem chaves e sem variáveis no Render. Tudo corre no telemóvel de quem usa.

## Publicar no Render (Static Site)
1. Envie esta pasta para um repositório no GitHub.
2. Na Render: New > Static Site > escolha o repositório. Build Command vazio. Publish Directory: `public`.

## O que tem
- **CV e carta** (PT/EN), **requerimentos e documentos**, **capa de trabalho escolar**, **recibos, orçamentos e faturas proforma**.
- **Fotos**: foto tipo passe numa folha A4 pronta a imprimir (3×4, 3,5×4,5, 4×4, 4×6 cm), várias fotos num só PDF, e reduzir uma foto até ao limite em KB do portal (grátis).
- **Salário líquido e recibo de vencimento**: INSS e IRT pela tabela da Lei n.º 14/25 (2026). A tabela está em `public/config.js` (`IRT_TAB`): se a lei mudar, edite só ali (e o ano).
- 6 páginas de conteúdo para o Google (`curriculo-angola.html`, `salario-liquido-angola.html`, etc.), todas no `sitemap.xml`.
- Funciona sem internet depois da primeira visita (`sw.js`).

## Configurar
1. `public/config.js`: preços, banco, NIB, titular, WhatsApp.
2. Códigos de acesso: abra `gerar-codigos.html` no navegador, gere códigos, cole os hashes em `codigos` no `config.js` e venda os códigos.
3. Se mudar o endereço do site, troque `ss-7uzy.onrender.com` em `public/index.html`, `robots.txt`, `sitemap.xml` e nas páginas `.html`.

## Limite de qualquer site estático
O pagamento (modo `honra`) é por confiança: o "Já paguei" não é verificado por um servidor, e quem souber mexer no navegador consegue contornar. Os códigos longos protegem só o modo `codigo`. Para verificação a sério seria preciso um servidor.

## Sugestão
Descarregue `jspdf.umd.min.js` (versão 2.5.1) para a pasta `public` e aponte o `index.html` para ele: assim o site não depende de nenhum serviço externo.
