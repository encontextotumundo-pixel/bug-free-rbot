// Configuración de URL de API
// IMPORTANTE: Después de desplegar en Railway, reemplaza esto con tu URL real
const API_BASE_URL = 'https://sms-api-produccion.up.railway.app';

// Si estás en desarrollo local, descomenta esta línea:
// const API_BASE_URL = 'http://localhost:3001';

class PersonalizationSystem {
  constructor() {
    this.token = null;
    this.clientData = null;
  }

  /**
   * Inicializar el sistema
   */
  async init() {
    // Obtener token de la URL
    this.token = this.getTokenFromURL();

    if (!this.token) {
      console.log('No token found in URL');
      return;
    }

    console.log('Token encontrado:', this.token);

    // Registrar apertura del enlace
    await this.recordOpenEvent();

    // Cargar datos del cliente
    await this.loadClientData();

    // Mostrar datos en la tarjeta
    if (this.clientData) {
      this.populateClientData();
    }
  }

  /**
   * Obtener token de los parámetros de la URL
   */
  getTokenFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('t') || null;
  }

  /**
   * Cargar datos del cliente desde el backend
   */
  async loadClientData() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/client/${this.token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        this.clientData = result.data;
        console.log('Datos del cliente cargados:', this.clientData);
        return true;
      } else {
        console.error('Error en respuesta del servidor:', result.error);
        return false;
      }
    } catch (error) {
      console.error('Error cargando datos del cliente:', error);
      return false;
    }
  }

  /**
   * Registrar evento de apertura del enlace
   */
  async recordOpenEvent() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/event/open`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: this.token })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Evento de apertura registrado:', result);
      }
    } catch (error) {
      console.error('Error registrando evento de apertura:', error);
    }
  }

  /**
   * Registrar evento de clic
   */
  async recordClickEvent(accion) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/event/click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: this.token,
          accion: accion || 'click'
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Evento de clic registrado:', result);
      }
    } catch (error) {
      console.error('Error registrando evento de clic:', error);
    }
  }

  /**
   * Rellenar datos del cliente en la tarjeta
   */
  populateClientData() {
    if (!this.clientData) return;

    // Buscar y llenar los campos en la página
    // Nombre completo
    const nameElement = document.querySelector('[data-personalize="nombre"]');
    if (nameElement) {
      nameElement.textContent = this.clientData.nombre_completo;
    }

    // Número de documento
    const docElement = document.querySelector('[data-personalize="documento"]');
    if (docElement) {
      docElement.textContent = this.clientData.numero_documento;
    }

    // Saldo/Valor total a pagar
    const saldoElement = document.querySelector('[data-personalize="saldo"]');
    if (saldoElement) {
      saldoElement.textContent = this.clientData.saldo;
    }

    // También intentar llenar campos comunes en el HTML
    this.tryFillCommonElements();
  }

  /**
   * Intentar llenar elementos comunes en el HTML
   */
  tryFillCommonElements() {
    // Buscar en todos los textos de la página
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while (node = walker.nextNode()) {
      // Reemplazar placeholders comunes (si existen)
      if (node.nodeValue && node.parentElement) {
        const originalText = node.nodeValue;

        if (originalText.includes('nombre_completo') || originalText.includes('{{nombre}}')) {
          node.nodeValue = originalText.replace(/nombre_completo|{{nombre}}/g, this.clientData.nombre_completo);
        }

        if (originalText.includes('numero_documento') || originalText.includes('{{documento}}')) {
          node.nodeValue = originalText.replace(/numero_documento|{{documento}}/g, this.clientData.numero_documento);
        }

        if (originalText.includes('{{saldo}}')) {
          node.nodeValue = originalText.replace(/{{saldo}}/g, this.clientData.saldo);
        }
      }
    }
  }

  /**
   * Registrar clic en elementos interactivos
   */
  trackElementClick(selector, accion) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.addEventListener('click', () => {
        this.recordClickEvent(accion);
      });
    });
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const personalizer = new PersonalizationSystem();
    personalizer.init();

    // Exponer la instancia globalmente para uso en la consola o desde otros scripts
    window.PersonalizationSystem = personalizer;
  });
} else {
  const personalizer = new PersonalizationSystem();
  personalizer.init();
  window.PersonalizationSystem = personalizer;
}
