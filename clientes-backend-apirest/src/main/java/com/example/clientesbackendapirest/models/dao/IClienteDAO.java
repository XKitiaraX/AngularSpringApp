package com.example.clientesbackendapirest.models.dao;

import com.example.clientesbackendapirest.models.entity.Cliente;
import org.springframework.data.repository.CrudRepository;

public interface IClienteDAO extends CrudRepository<Cliente, Long> {
}
