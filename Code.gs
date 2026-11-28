/**
 * Mukanda — Registo central de comprovativos (Google Sheets + Apps Script)
 * Guarda apenas metadados e o SHA-256 do ficheiro. Nunca recebe nem guarda a imagem/PDF.
 * Estado inicial é sempre PENDENTE: isto não confirma a entrada do dinheiro.
 */
function setup() {
  var ss = SpreadsheetApp.create('Mukanda — Registo de pagamentos');
  var sh = ss.getActiveSheet();
  sh.setName('Pedidos');
  sh.appendRow(['Recebido em', 'Ticket', 'Estado', 'Nome', 'Serviço', 'Tipo', 'Valor declarado (Kz)', 'Preço esperado (Kz)', 'Data declarada', 'Referência da transação', 'Referência Mukanda', 'SHA-256 do ficheiro']);
  sh.setFrozenRows(1);
  sh.getRange(1, 1, 1, 12).setFontWeight('bold');
  PropertiesService.getScriptProperties().setProperty('MUKANDA_SHEET_ID', ss.getId());
  Logger.log('Folha criada: ' + ss.getUrl());
  return ss.getUrl();
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  var cb = String(p.callback || '');
  if (!/^mkpay_[A-Za-z0-9_]+$/.test(cb)) return ContentService.createTextOutput('/* pedido inválido */');
  var out;
  try { out = registar_(p); }
  catch (err) { out = {ok:false, status:'error'}; }
  return ContentService.createTextOutput(cb + '(' + JSON.stringify(out) + ');')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function registar_(p) {
  var nome = limpar_(p.nome, 80);
  var ref = limpar_(p.referencia, 80).toUpperCase().replace(/\s+/g, '');
  var data = limpar_(p.data, 10);
  var valor = String(p.valor || '');
  var preco = String(p.preco || '');
  var hash = String(p.hash || '').toLowerCase();
  var servico = limpar_(p.servico, 30);
  var tipo = limpar_(p.tipo, 30);
  var refMukanda = limpar_(p.refMukanda, 30);
  if (!nome || !ref || !/^\d{4}-\d{2}-\d{2}$/.test(data) || !/^\d+$/.test(valor) || valor !== preco || !/^[a-f0-9]{64}$/.test(hash)) {
    return {ok:false, status:'invalid'};
  }
  var paymentDate = new Date(data + 'T00:00:00');
  var today = new Date(); today.setHours(23,59,59,999);
  if (isNaN(paymentDate.getTime()) || paymentDate.getTime() > today.getTime()) return {ok:false, status:'invalid_date'};
  var id = PropertiesService.getScriptProperties().getProperty('MUKANDA_SHEET_ID');
  if (!id) return {ok:false, status:'not_setup'};
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var sh = SpreadsheetApp.openById(id).getSheetByName('Pedidos');
    var last = sh.getLastRow();
    if (last >= 2) {
      // Coluna J = referência; coluna L = hash. A comparação é central, entre todos os clientes.
      var rows = sh.getRange(2, 1, last - 1, 12).getValues();
      for (var i = 0; i < rows.length; i++) {
        var oldRef = String(rows[i][9] || '').toUpperCase().replace(/\s+/g, '');
        var oldHash = String(rows[i][11] || '').toLowerCase();
        if (oldRef === ref || oldHash === hash) return {ok:true, status:'duplicate'};
      }
    }
    var ticket = 'MKP-' + Utilities.getUuid().replace(/-/g, '').slice(0, 10).toUpperCase();
    sh.appendRow([new Date(), ticket, 'PENDENTE — não confirmado', nome, servico, tipo, valor, preco, data, ref, refMukanda, hash]);
    return {ok:true, status:'pending', ticket:ticket};
  } finally { lock.releaseLock(); }
}

function limpar_(v, max) {
  var s = String(v || '').replace(/[<>\u0000-\u001F]/g, '').trim().slice(0, max);
  if (/^[=+@\-]/.test(s)) s = "'" + s; // evita fórmulas em células da folha
  return s;
}
