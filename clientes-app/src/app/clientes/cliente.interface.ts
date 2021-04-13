export interface ClienteInterface {
  id: number;
  nombre: string;
  apellido: string;
  createAt: string;
  email: string;
}

export interface RespuestaInterface {
  mensaje: string;
  cliente: ClienteInterface;
}
