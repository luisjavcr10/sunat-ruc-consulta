// Cargar las variables de entorno desde el archivo .env (si usas dotenv)
require('dotenv').config();

const config = {
  TESSERACT_ROUTE: process.env.TESSERACT_ROUTE || '/usr/bin/tesseract', // Ruta de Tesseract
  SUNAT_URL_IMG: process.env.SUNAT_URL_IMG || 'https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/captcha?accion=image&magic=2', // URL de la imagen
  SUNAT_URL_INFO: process.env.SUNAT_URL_INFO || 'http://www.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias?accion=consPorRuc&nroRuc=${ruc}&codigo=${codigo}', // URL para consultar la información del RUC

  // Configuración de los entornos
  getEnvConfig() {
    if (process.env.NODE_ENV === 'production') {
      return {
        DEBUG: false,
        TESTING: false
      };
    } else if (process.env.NODE_ENV === 'development') {
      return {
        DEBUG: true,
        TESTING: false
      };
    } else if (process.env.NODE_ENV === 'testing') {
      return {
        DEBUG: false,
        TESTING: true
      };
    }
  }
};

module.exports = config;
 
