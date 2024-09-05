// Generated by https://quicktype.io
// Generated by https://quicktype.io

export interface Reporte {
  venta_id:           number;
  status:             number;
  office_id:          number;
  username:           string;
  fecha_venta:        string;
  forma_pago:         number;
  cantidad:           string;
  precio:             string;
  total:              string;
  plus:               number;
  tipo_descuento:     string;
  descuento:          string;
  descuento_extra:    number;
  total_pago:         number;
  poliza_id:          number;
  poliza_st:          number;
  servicio_id:        number;
  destino:            string;
  fecha_salida:       string;
  fecha_retorno:      string;
  nro_dias:           number;
  extra:              number;
  beneficiario_id:    number;
  primer_apellido:    string;
  segundo_apellido:   string;
  primer_nombre:      string;
  segundo_nombre:     string;
  nro_identificacion: string;
  fecha_nacimiento:   string;
  edad:               number;
  origen:             string;
  email:              string;
  telefono:           string;
  multiviaje:         number;
  fecha_caducidad:    string;
  comision:            number;
}


// Generated by https://quicktype.io

export interface ReporteSiniestro {
  venta_id:           number;
  status:             number;
  office_id:          number;
  username:           string;
  fecha_venta:        string;
  cantidad:           string;
  precio:             string;
  total:              string;
  plus:               number;
  tipo_descuento:     string;
  descuento:          string;
  descuento_extra:    number;
  total_pago:         number;
  poliza_id:          number;
  poliza_st:          number;
  servicio_id:        number;
  destino:            string;
  fecha_salida:       string;
  fecha_retorno:      string;
  nro_dias:           number;
  extra:              number;
  beneficiario_id:    number;
  primer_apellido:    string;
  segundo_apellido:   string;
  primer_nombre:      string;
  segundo_nombre:     string;
  nro_identificacion: string;
  fecha_nacimiento:   string;
  edad:               number;
  origen:             string;
  email:              string;
  telefono:           string;
  siniestro_id:       number;
  tipo_siniestro:     number;
  descripcion:        string;
  fecha_siniestro:    string;
  pais_ocurrencia:    string;
  ciudad_ocurrencia:  string;
  url_archivo:        string;
  comision:           number;
}