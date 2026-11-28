# Mukanda — validação preliminar de comprovativos

## A única solução escolhida

Um registo central gratuito com Google Apps Script + Google Sheets. Cada cliente envia os dados do pagamento e o navegador calcula o SHA-256 do ficheiro. O servidor compara a referência da transação e o hash com **todos os pedidos anteriores**, independentemente do telemóvel usado. Os pedidos entram numa folha central como `PENDENTE — não confirmado`.

A imagem/PDF **não é enviada nem guardada** no Google. Só são guardados nome, serviço, valor declarado, data, referência da transação, referência Mukanda e hash SHA-256. Isto permite detetar reutilização do mesmo ficheiro ou da mesma referência, mas não prova que o dinheiro entrou na conta. Imagens alteradas podem ter hashes diferentes; por isso, a referência da transação é também comparada.

## Ativar (uma vez)

1. Abre [script.google.com](https://script.google.com/) com uma conta Google que controlas e cria um projeto.
2. Apaga o conteúdo inicial e cola todo o ficheiro `integracao/Code.gs`.
3. Guarda. No seletor de funções, escolhe `setup` e executa. Autoriza o acesso. A execução cria a folha `Mukanda — Registo de pagamentos`; guarda o link que aparece no registo de execução.
4. Vai a **Implementar → Nova implementação → Aplicação Web**.
5. Executar como: **Eu**. Quem pode aceder: **Qualquer pessoa**. Implementa e copia o URL da aplicação Web terminado em `/exec`.
6. Abre `public/config.js` e cola esse URL em `verificadorUrl` (mantém as aspas). Não coloques o URL da folha; é o URL da aplicação Web.
7. Publica a pasta `public` no Render como já fazes. Não alteres o domínio, logótipo, sitemap, robots.txt ou páginas SEO.

Se mudares o código `Code.gs`, cria uma nova versão da implementação em **Implementar → Gerir implementações → Editar → Nova versão**.

## Como funciona para o cliente

1. Cria o documento e vê a pré-visualização.
2. Toca em pagar, faz a transferência e preenche nome, referência, data e valor.
3. Anexa o comprovativo e envia.
4. O sistema calcula o hash localmente e consulta o registo central. Se a referência ou o ficheiro já aparecerem, assinala duplicado. Caso contrário, cria um ticket pendente.
5. O cliente continua a poder usar a versão gratuita. O Premium não é desbloqueado só por anexar uma imagem.

## Confirmação e limites

A folha é uma fila central que podes consultar depois das aulas. Confirma cada pagamento no extrato da conta antes de libertar Premium/código. A análise automática deteta duplicados e erros de preenchimento, não autentica visualmente documentos nem consulta o banco. Para confirmação bancária totalmente automática seria necessário um gateway/API oficial do banco ou prestador de pagamentos, com acesso autorizado.

A implementação é gratuita dentro dos limites de utilização do Google Apps Script. O endpoint é público porque o site é público; não uses esta folha para dados bancários sensíveis. O script guarda apenas os campos mínimos descritos acima. Revê os pedidos na folha e não partilhes o link de edição.
