package com.example.clientesbackendapirest.models.dao;

import com.example.clientesbackendapirest.models.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IClienteDAO extends JpaRepository<Cliente, Long> {
}
