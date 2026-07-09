import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const excelPath = path.join(__dirname, '../resultados.xlsx');

console.log('📂 Leyendo:', excelPath);
console.log('');

try {
  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);

  console.log(`📊 Hoja: "${sheetName}"`);
  console.log(`📝 Total de clientes: ${data.length}`);
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  data.forEach((row, index) => {
    const token = uuidv4();
    console.log(`👤 Cliente ${index + 1}:`);
    console.log(`   Nombre: ${JSON.stringify(row)}`);
    console.log(`   Token generado: ${token}`);
    console.log('');
  });

} catch (error) {
  console.error('❌ Error:', error.message);
}
