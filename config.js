// Edite aqui os dados de pagamento. Deixe vazio o que ainda não tiver.
var PAGAMENTO = {
  preco: '400 Kz',      // preço de cada documento (padrão)
  exigirComprovativo: true,   // true = o cliente anexa o comprovativo (foto ou PDF) antes de descarregar sem marca
  precosDoc: { requerimento:'200 Kz', declaracao:'200 Kz', rescisao:'200 Kz', candidatura:'200 Kz', licenca:'200 Kz', reclamacao:'200 Kz', honra:'200 Kz', recibo:'200 Kz' },   // documentos de 1 página (o resto usa o preço de 'documentos')
  precos: { escola: '300 Kz', fotos: '300 Kz', salario: '300 Kz' },   // preços por serviço (cv, documentos, escola); o que não estiver aqui usa o preço padrão
  primeiroGratis: false,  // o 1.º documento de cada pessoa (por aparelho) é grátis
  canal: '',   // endereço do teu Canal de WhatsApp (ex: https://whatsapp.com/channel/...). Vazio = não aparece
  modo: 'honra',   // 'honra' = PDF grátis com marca no rodapé; sem marca = paga, escreve o nome e toca "Já paguei" (2 documentos por pagamento) | 'codigo' = só com código de acesso | 'livre' = descarga livre e pagamento voluntário
  banco: 'BFA',            // ex: BAI
  nib: '000600003840991930117',   // NIB (21 dígitos). Confirme no app do banco
  iban: '',             // IBAN da conta que vai receber (ex: AO06 0000 0000 0000 0000 0000 0)
  titular: 'Manuel Mário de Matos',          // nome do titular da conta
  codigos: [
    '3d53d6c289409a6da0e9575ca3fde1d9770a4c321103561d2fa0b36dbf8c1062',
    '9e5790b9c2bd0127c98472a27c1dc57eddb798c1bfd2cad30193c4486b20ba71',
    '76f6999be744f1c5040a189fffd2ac3fcdf6499cc2aaad07813efb3de0e63316',
    'f0e51cc6a990faf3631a1a7255462714fbeaabd0449522390a2f8d24ea63c0a6',
    '46c378ac0dadf8a8a14cf2d2de4bbd28afd19d5fa150a2339a0406377e427d9b',
    'e3800c1f1352d9fa69de8aadd213a9ff793bab74de80e5978da21d1b3965f586',
    'f0fa1cfd6efaefe780ceeaced19ef0468334ffc18367f2d5db081f705ba8b328',
    'ad5e90fad70a6d167b154aedc67fcafdb27ff503d459cd5e2ea69be497c43c34',
    'cb2f8535e8be33536ead78757cace11c56b8ebf60c7a22f790f2a5a195e57fe4',
    '266a3f4148b479cb219beeb7f17fd1df08612c12f81e64b3f8cc2a27d560367e'
  ],          // hashes dos códigos válidos (gere com gerar-codigos.html)
  whatsapp: '244947463471'          // número para receber o comprovativo, só dígitos, com 244 (ex: 244923000000)
};

// Tabela de IRT do Grupo A (trabalhadores por conta de outrem), Lei n.º 14/25, de 30 de Dezembro (OGE 2026).
// Cada linha: [limite inferior do escalão (Kz), parcela fixa (Kz), taxa]. IRT = parcela fixa + (base - limite) × taxa.
// Base do IRT = remuneração sujeita - INSS do trabalhador. Se a lei mudar, é só editar aqui (e o ano).
var IRT_TAB = {
  ano: 2026,
  fonte: 'Lei n.º 14/25, de 30 de Dezembro (OGE 2026)',
  inss: 0.03,      // desconto do trabalhador
  inssEmp: 0.08,   // contribuição da empresa (só informativa)
  escaloes: [[0,0,0],[150000,12500,0.16],[200000,31250,0.18],[300000,49250,0.19],[500000,87250,0.20],[1000000,187250,0.21],[1500000,292250,0.22],[2000000,402250,0.23],[2500000,517250,0.24],[5000000,1117250,0.245],[10000000,2342250,0.25]]
};
