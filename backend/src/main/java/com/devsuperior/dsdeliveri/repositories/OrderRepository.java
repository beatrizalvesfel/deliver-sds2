package com.devsuperior.dsdeliveri.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devsuperior.dsdeliveri.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}
