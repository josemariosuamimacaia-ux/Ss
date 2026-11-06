# Mukanda
Gerador de CV e carta de apresentação em PDF, feito para Angola. O PDF é criado no telemóvel do utilizador (nenhum dado é enviado para o servidor).

## Publicar na Render
1. Crie um repositório no GitHub e envie estes ficheiros (descompactados).
2. Na Render: New > Web Service > escolha o repositório.
3. Build Command: `npm install` | Start Command: `npm start`.
4. Depois de publicado, altere `SITE_URL` no fim de `public/index.html` para o seu endereço.

## Testar localmente
`npm install && npm start` e abra http://localhost:3000

## Pagamento (transferência bancária)
1. Preencha `public/config.js` (preço, banco, IBAN, titular, WhatsApp).
2. Na Render, em Environment, crie `CODIGOS` com os códigos válidos separados por vírgula (ex: `MK-7391,MK-2285`).
3. Quando alguém pagar e enviar o comprovativo, envie-lhe um dos códigos. Para anular um código, retire-o de `CODIGOS`.
