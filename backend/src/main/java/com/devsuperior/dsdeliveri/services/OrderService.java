package com.devsuperior.dsdeliveri.services;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsdeliveri.dto.OrderDTO;
import com.devsuperior.dsdeliveri.dto.ProductDTO;
import com.devsuperior.dsdeliveri.entities.Order;
import com.devsuperior.dsdeliveri.entities.OrderStatus;
import com.devsuperior.dsdeliveri.entities.Product;
import com.devsuperior.dsdeliveri.repositories.OrderRepository;
import com.devsuperior.dsdeliveri.repositories.ProductRepository;

@Service
public class OrderService {
	
	@Autowired
	private OrderRepository repository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Transactional(readOnly = true)
	public List<OrderDTO> findAll() {
		List<Order> list = repository.findOrdersWithProducts();
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional
	public OrderDTO insert(OrderDTO dto) {
		Order order = new Order(null, dto.getAddress(), dto.getLatitude(), dto.getLongitude(),
			Instant.now(), OrderStatus.PENDING);
		for (ProductDTO p : dto.getProducts() ) {
			Product product = productRepository.getOne(p.getId());
			order.getProducts().add(product);
		}
		order = repository.save(order);
		return new OrderDTO(order);
	}
}
