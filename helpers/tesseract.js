const axios = require("axios");
const Tesseract = require("tesseract.js");

async function readTextFromImageSunat(urlImage) {
  try {
    // Descargar la imagen con axios
    const responseImage = await axios.get(urlImage, { responseType: "arraybuffer" });

    // Usamos Tesseract.js para leer el texto de la imagen
    const imgBuffer = Buffer.from(responseImage.data, "binary");

    const { data: { text } } = await Tesseract.recognize(
      imgBuffer,
      "eng", // Puedes cambiar a otro idioma si es necesario
      {
        logger: (m) => console.log(m), // Puedes usar este log para ver el progreso
      }
    );

    // Retornar el texto extraído y las cookies (si las necesitas)
    const cookies = responseImage.headers["set-cookie"];
    return { imgText: text, cookies };
  } catch (error) {
    throw new Error("Error al procesar la imagen de la SUNAT: " + error.message);
  }
}

module.exports = { readTextFromImageSunat };
