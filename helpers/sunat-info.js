const axios = require("axios");
const cheerio = require("cheerio");
const SunatInfo = require("../models/sunat-info");

const config = require('../config'); 

const { TESSERACT_ROUTE, SUNAT_URL_IMG, SUNAT_URL_INFO, getEnvConfig } = config;

async function readInfo(imgText, ruc, cookies) {
  try {
    const url = SUNAT_URL_INFO.replace("{ruc}", ruc).replace("{img_text}", imgText);
    const response = await axios.get(url, { headers: { Cookie: cookies } });

    // Parsear el HTML con Cheerio
    const $ = cheerio.load(response.data);
    const tableInfo = $("tr"); // Obtiene todas las filas de la tabla

    return tableInfo;
  } catch (error) {
    throw new Error("Error al obtener datos de la SUNAT");
  }
}

function convertSunatObj(tableInfo, ruc) {
  try {
    const sunatInfo = new SunatInfo();

    // Extraer datos de la tabla
    const numeroRuc = tableInfo.eq(0).find("td").eq(1).text().trim();
    const [rucNum, razonSocial] = numeroRuc.split("-");
    sunatInfo.ruc = rucNum;
    sunatInfo.razon_social = razonSocial;

    sunatInfo.tipo_contribuyente = tableInfo.eq(1).find("td").eq(1).text().trim();

    // Verificar si es persona natural o jurídica
    let sunatCons;
    if (ruc.startsWith("1")) {
      const nuevoRus = tableInfo.eq(3).find("td").eq(2).text().trim();
      sunatCons = nuevoRus.includes("Afecto al Nuevo RUS") ? "PersonaNaturalNuevoRus" : "PersonaNaturalSinRus";
    } else if (ruc.startsWith("2")) {
      sunatCons = "PersonaJuridica";
    }

    // Extraer datos según el tipo de contribuyente
    sunatInfo.nombre_comercial = tableInfo.eq(4).find("td").eq(1).text().trim();
    sunatInfo.fecha_inscripcion = tableInfo.eq(5).find("td").eq(1).text().trim();
    sunatInfo.estado_contribuyente = tableInfo.eq(6).find("td").eq(1).text().trim();
    sunatInfo.condicion_contribuyente = tableInfo.eq(7).find("td").eq(1).text().trim();
    sunatInfo.domicilio_fiscal = tableInfo.eq(8).find("td").eq(1).text().trim();
    sunatInfo.actividad_economica = tableInfo.eq(9).find("td").eq(1).find("option").text().trim();

    return sunatInfo;
  } catch (error) {
    throw new Error("HTML Incorrecto");
  }
}

module.exports = { readInfo, convertSunatObj };
