import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Usar variable de entorno si está disponible, sino calcular
const PROJECT_ROOT = process.env.PROJECT_ROOT || path.join(__dirname, '../..');

class Database {
  constructor() {
    this.excelPath = path.join(PROJECT_ROOT, 'resultados.xlsx');
    this.eventsPath = path.join(PROJECT_ROOT, 'data', 'events.json');
    this.clientesPath = path.join(PROJECT_ROOT, 'data', 'clientes-con-tokens.json');
    this.clientes = this.loadClientes();
  }

  loadClientes() {
    try {
      console.log(`🔍 PROJECT_ROOT: ${PROJECT_ROOT}`);
      console.log(`📁 Directorio actual: ${process.cwd()}`);
      console.log(`🔍 Buscando archivo en: ${this.clientesPath}`);
      console.log(`🔍 Buscando Excel en: ${this.excelPath}`);

      // Primero intentar cargar desde el archivo guardado (con tokens persistentes)
      if (fs.existsSync(this.clientesPath)) {
        console.log(`✅ Archivo de datos encontrado`);
        const data = JSON.parse(fs.readFileSync(this.clientesPath, 'utf-8'));
        console.log(`✅ Clientes cargados desde archivo guardado: ${data.clientes.length}`);
        return data.clientes;
      } else {
        console.log(`⚠️ Archivo de datos NO encontrado: ${this.clientesPath}`);
      }

      // Si no existe, crear desde el Excel
      console.log('📂 Leyendo Excel y generando tokens...');
      const workbook = XLSX.readFile(this.excelPath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      // Procesar y normalizar datos, saltando la primera fila si es encabezado
      const clientesProcessados = [];
      data.forEach((row, index) => {
        const nombreCompleto = row['23CODE RECORDS'] || '';
        const telefono = row['__EMPTY'] || '';
        const numeroDocumento = row['__EMPTY_1'] || '';

        // Saltar encabezados y filas vacías
        if (nombreCompleto && nombreCompleto.toLowerCase() === 'nombre y apellido') {
          return;
        }
        if (!nombreCompleto || nombreCompleto.trim() === '') {
          return;
        }

        // Generar token único
        const token = this.generateUUID();

        clientesProcessados.push({
          id: clientesProcessados.length + 1,
          nombre_completo: nombreCompleto.trim(),
          numero_documento: String(numeroDocumento).trim(),
          telefono: String(telefono).trim(),
          token_unico: token,
          saldo: '$0.00',
          estado: 'activo'
        });
      });

      // Guardar los clientes con tokens para futuras cargas
      this.saveClientes(clientesProcessados);

      console.log(`✅ Clientes cargados del Excel: ${clientesProcessados.length}`);
      return clientesProcessados;
    } catch (error) {
      console.error('Error cargando clientes:', error.message);
      return [];
    }
  }

  saveClientes(clientes) {
    try {
      const dataDir = path.dirname(this.clientesPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const data = { clientes };
      fs.writeFileSync(this.clientesPath, JSON.stringify(data, null, 2));
      console.log(`💾 Tokens guardados en: ${this.clientesPath}`);
    } catch (error) {
      console.error('Error guardando clientes:', error.message);
    }
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  reloadClientes() {
    this.clientes = this.loadClientes();
  }

  findClientByToken(token) {
    return this.clientes.find(c => c.token_unico === token);
  }

  findClientByDocument(documento) {
    return this.clientes.find(c => c.numero_documento === documento);
  }

  getAllClientes() {
    return this.clientes;
  }

  addEvent(evento) {
    try {
      // Crear directorio si no existe
      const dataDir = path.dirname(this.eventsPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      let data = { eventos: [] };
      if (fs.existsSync(this.eventsPath)) {
        data = JSON.parse(fs.readFileSync(this.eventsPath, 'utf-8'));
      }

      const newId = data.eventos.length > 0
        ? Math.max(...data.eventos.map(e => e.id)) + 1
        : 1;

      evento.id = newId;
      data.eventos.push(evento);

      fs.writeFileSync(this.eventsPath, JSON.stringify(data, null, 2));
      return evento;
    } catch (error) {
      console.error('Error guardando evento:', error);
      throw error;
    }
  }

  getEventsByToken(token) {
    try {
      if (!fs.existsSync(this.eventsPath)) {
        return [];
      }
      const data = JSON.parse(fs.readFileSync(this.eventsPath, 'utf-8'));
      return data.eventos.filter(e => e.token === token);
    } catch (error) {
      console.error('Error leyendo eventos:', error);
      return [];
    }
  }

  getOpenCount(token) {
    const eventos = this.getEventsByToken(token);
    return eventos.filter(e => e.tipo === 'open').length;
  }
}

export default new Database();
