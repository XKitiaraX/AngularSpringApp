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

export interface PaginaClientes {
  content:          Content[];
  pageable:         Pageable;
  last:             boolean;
  totalElements:    number;
  totalPages:       number;
  size:             number;
  number:           number;
  sort:             Sort;
  first:            boolean;
  numberOfElements: number;
  empty:            boolean;
}

export interface Content {
  id:       number;
  nombre:   string;
  apellido: string;
  email:    string;
  createAt: string;
}

export interface Pageable {
  sort:       Sort;
  offset:     number;
  pageSize:   number;
  pageNumber: number;
  unpaged:    boolean;
  paged:      boolean;
}

export interface Sort {
  sorted:   boolean;
  unsorted: boolean;
  empty:    boolean;
}
