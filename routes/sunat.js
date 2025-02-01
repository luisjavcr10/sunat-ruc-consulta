const express = require('express');
const router = express.Router();
const { readTextFromImageSunat } = require('../helpers/tesseract');
const { readInfo, convertSunatObj } = require('../helpers/sunat-info');

const config = require('../config'); 

const { TESSERACT_ROUTE, SUNAT_URL_IMG, SUNAT_URL_INFO, getEnvConfig } = config;

// Ruta para consultar la información de la SUNAT
router.get('/', async (req, res) => {
  const urlImage =SUNAT_URL_IMG;  

  // Validar si el RUC fue enviado
  const ruc = req.query.ruc;
  if (!ruc) {
    return res.status(400).json({ message: 'RUC no enviado' });
  }

  // Validar que el RUC sea correcto
  if (ruc.trim().length !== 11) {
    return res.status(400).json({ message: 'RUC no válido' });
  }

  if (ruc[0] !== '1' && ruc[0] !== '2') {
    return res.status(400).json({ message: 'RUC no válido' });
  }

  let tableInfo = null; 
  let attempts = 0;
  const maxAttempts = 50;

  while (!tableInfo && attempts <= maxAttempts) {
    try {
      // Leer texto de la imagen usando Tesseract.js
      const { imgText, cookies } = await readTextFromImageSunat(urlImage);

      // Intentar obtener la información de la SUNAT
      tableInfo = await readInfo(imgText, ruc, cookies);
    } catch (error) {
      // Continuar el ciclo si ocurre un error
      attempts++;
      if (attempts > maxAttempts) {
        return res.status(400).json({ message: 'Ocurrió un error al obtener la información' });
      }
    }
  }

  if (!tableInfo) {
    return res.status(400).json({ message: 'Ocurrió un Error' });
  }

  // Convertir los datos a un objeto de la SUNAT
  const sunatObj = convertSunatObj(tableInfo, ruc);

  // Retornar la respuesta con los datos de la SUNAT
  return res.status(200).json(sunatObj.serialize());
});

module.exports = router;
