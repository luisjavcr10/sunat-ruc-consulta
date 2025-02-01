// app/helpers/sunatconstants.js

const PersonaNaturalNuevoRusConstant = {
    numero_ruc: 0,
    tipo_contribuyente: 1,
    nombre_comercial: 3,
    fecha_inscripcion: 4,
    estado_contribuyente: 5,
    condicion_contribuyente: 6,
    domicilio_fiscal: 7,
    actividad_economica: 10
};

const PersonaNaturalSinRusConstant = {
    numero_ruc: 0,
    tipo_contribuyente: 1,
    nombre_comercial: 3,
    fecha_inscripcion: 4,
    estado_contribuyente: 5,
    condicion_contribuyente: 6,
    domicilio_fiscal: 7,
    actividad_economica: 10
};

const PersonaJuridicaConstant = {
    numero_ruc: 0,
    tipo_contribuyente: 1,
    nombre_comercial: 2,
    fecha_inscripcion: 3,
    estado_contribuyente: 4,
    condicion_contribuyente: 5,
    domicilio_fiscal: 6,
    actividad_economica: 9
};

// Exportar las constantes
module.exports = {
    PersonaNaturalNuevoRusConstant,
    PersonaNaturalSinRusConstant,
    PersonaJuridicaConstant
};