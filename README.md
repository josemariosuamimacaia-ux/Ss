# Mukanda (site estático, grátis e sem espera)
## Publicar na Render (Static Site, não adormece)
1. Envie esta pasta para um repositório no GitHub.
2. Na Render: New > Static Site > escolha o repositório.
3. Build Command: deixe vazio. Publish Directory: `public`.

## Antes de publicar
1. Edite `public/config.js` (preço, banco, IBAN, titular, WhatsApp).
2. Abra `gerar-codigos.html` no navegador, escreva os códigos e cole o resultado em `codigos` no config.js.
3. Troque `SEU-ENDERECO` pelo endereço final do site em `public/index.html`, `public/robots.txt` e `public/sitemap.xml`.
Os ficheiros server.js e package.json já não são necessários.

## Modo de pagamento
Em `public/config.js`: `obrigatorio: false` = descarga livre e pagamento voluntário (sem códigos). `obrigatorio: true` = só descarrega com código de acesso.

## Modo de pagamento (config.js, campo `modo`)
- `honra`: o cliente paga, envia o comprovativo e toca em "Já paguei" para descarregar (sem códigos, não é verificado).
- `codigo`: só descarrega com código de acesso (verificado por si).
- `livre`: descarga livre e pagamento voluntário.

## Versão grátis e versão sem marca (modo `honra`)
O PDF grátis leva uma linha no rodapé com o endereço do site. Para o PDF sem marca o cliente paga, escreve o nome, toca em "Já paguei" e envia o comprovativo por WhatsApp (2 documentos por pagamento). Você confirma no extrato do banco pela referência.

## Pontos fortes (só programação, sem IA nem servidor)
- Funciona sem internet depois da primeira visita (sw.js guarda o site e o gerador de PDF).
- CV e carta em Português ou em Inglês, com um toque.
- Valores por extenso nos contratos (ex: 150.000 Kz (cento e cinquenta mil kwanzas)).
- Botão para partilhar o PDF por WhatsApp ou email, já com o ficheiro anexado.
- Botão para copiar o NIB.
- Os dados ficam no telemóvel do cliente.
Nota: ao publicar uma versão nova, o site atualiza-se sozinho quando o cliente tem internet.

## Funciona sem internet
Depois da primeira visita, o site guarda-se no telemóvel (`sw.js`) e abre mesmo sem dados. O gerador de PDF fica guardado depois da primeira vez que o cliente gera um documento.
