class SunatInfo {
    constructor() {
      this.ruc = "";
      this.razon_social = "";
      this.tipo_contribuyente = "";
      this.nombre_comercial = "";
      this.fecha_inscripcion = "";
      this.estado_contribuyente = "";
      this.condicion_contribuyente = "";
      this.domicilio_fiscal = "";
      this.actividad_economica = "";
    }
  
    serialize() {
      return {
        ruc: this.ruc,
        razon_social: this.razon_social,
        tipo_contribuyente: this.tipo_contribuyente,
        nombre_comercial: this.nombre_comercial,
        fecha_inscripcion: this.fecha_inscripcion,
        estado_contribuyente: this.estado_contribuyente,
        condicion_contribuyente: this.condicion_contribuyente,
        domicilio_fiscal: this.domicilio_fiscal,
        actividad_economica: this.actividad_economica,
      };
    }
  }
  
module.exports = SunatInfo;
  