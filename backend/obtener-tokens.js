import db from './src/db/database.js';

console.log('\n🔑 TOKENS Y DATOS DE CLIENTES\n');
console.log('═══════════════════════════════════════════════════════════════\n');

db.getAllClientes().forEach((cliente, index) => {
  console.log(`👤 ${index + 1}. ${cliente.nombre_completo}`);
  console.log(`   📱 Teléfono: ${cliente.telefono}`);
  console.log(`   📄 Documento: ${cliente.numero_documento}`);
  console.log(`   🔑 Token: ${cliente.token_unico}`);
  console.log(`   🔗 Enlace: http://localhost:3000/5.html?t=${cliente.token_unico}`);
  console.log('');
});

console.log('═══════════════════════════════════════════════════════════════\n');
