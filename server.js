const express = require('express');
const app = express();
const config = require('./config'); // Importar configuración

// Configurar las rutas
const homeRoutes = require('./routes/home');
const sunatRoutes = require('./routes/sunat');
app.use('/', homeRoutes);
app.use('/sunat', sunatRoutes);

// Acceder a la configuración
const { TESSERACT_ROUTE, SUNAT_URL_IMG, SUNAT_URL_INFO, getEnvConfig } = config;
console.log(`Tesseract Route: ${TESSERACT_ROUTE}`); // Imprime la ruta de Tesseract
console.log(`Sunat URL Info: ${SUNAT_URL_INFO}`); // Imprime la URL de información del RUC

// Configurar el entorno y agregar la configuración correspondiente
const envConfig = getEnvConfig();
console.log(envConfig);  // Imprime las configuraciones específicas del entorno

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
