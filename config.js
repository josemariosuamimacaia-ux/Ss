// Edite aqui os dados de pagamento. Deixe vazio o que ainda não tiver.
var PAGAMENTO = {
  preco: '500 Kz',      // preço fixo (altere quando quiser)
  banco: 'BFA',            // ex: BAI
  nib: '000600003840991930117',   // NIB (21 dígitos). Confirme no app do banco
  iban: '',             // IBAN da conta que vai receber (ex: AO06 0000 0000 0000 0000 0000 0)
  titular: 'Manuel Mário de Matos',          // nome do titular da conta
  codigos: [],          // hashes dos códigos válidos (gere com gerar-codigos.html)
  whatsapp: '244947463471'          // número para receber o comprovativo, só dígitos, com 244 (ex: 244923000000)
};
