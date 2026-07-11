// Configuración de URL de API
const API_BASE_URL = 'https://bug-free-rbot-production.up.railway.app';

class LoanSimulatorLoader {
  constructor() {
    this.token = null;
    this.clientData = null;
  }

  async init() {
    // Obtener token de la URL
    this.token = this.getTokenFromURL();

    if (!this.token) {
      console.log('No token found in URL');
      return;
    }

    console.log('Token encontrado para Loan Simulator:', this.token);

    // Registrar apertura del enlace
    await this.recordOpenEvent();

    // Cargar datos del cliente
    await this.loadClientData();

    // Mostrar datos en los campos
    if (this.clientData) {
      this.populateClientData();
    }
  }

  getTokenFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('t') || null;
  }

  async loadClientData() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/loan/${this.token}`, {
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
        console.log('Datos del cliente cargados en Loan Simulator:', this.clientData);
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
        console.log('Evento de apertura registrado (Loan Simulator):', result);
      }
    } catch (error) {
      console.error('Error registrando evento de apertura:', error);
    }
  }

  async recordClickEvent(accion) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/event/click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: this.token,
          accion: accion || 'click-loan-simulator'
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Evento de clic registrado (Loan Simulator):', result);
      }
    } catch (error) {
      console.error('Error registrando evento de clic:', error);
    }
  }

  populateClientData() {
    if (!this.clientData) return;

    // Llenar campo de cédula
    const cedulaElement = document.getElementById('cedulaSalvavidas');
    if (cedulaElement) {
      cedulaElement.value = this.clientData.numero_documento;
    }

    // Llenar campo de nombre
    const nombreElement = document.getElementById('nombreCompletoSalvavidas');
    if (nombreElement) {
      nombreElement.value = this.clientData.nombre_completo;
    }

    // Llenar campo de teléfono
    const telefonoElement = document.getElementById('numeroTelefonoSalvavidas');
    if (telefonoElement) {
      telefonoElement.value = this.clientData.telefono;
    }

    console.log('Datos de cliente precargados en formulario');
  }

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
    const loanLoader = new LoanSimulatorLoader();
    loanLoader.init();
    window.LoanSimulatorLoader = loanLoader;
  });
} else {
  const loanLoader = new LoanSimulatorLoader();
  loanLoader.init();
  window.LoanSimulatorLoader = loanLoader;
}
