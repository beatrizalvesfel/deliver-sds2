package com.devsuperior.dsdeliver.controllers;

import com.devsuperior.dsdeliver.dto.OrderDTO;
import com.devsuperior.dsdeliver.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderDTO>> findAll() {
        return ResponseEntity.ok(orderService.findAll());
    }

    @PostMapping
    public ResponseEntity<OrderDTO> insert(@RequestBody OrderDTO orderDTO) {
        orderDTO = orderService.insert(orderDTO);
        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(orderDTO.getId()).toUri()).body(orderDTO);
    }

    @PutMapping("/{id}/delivered")
    public ResponseEntity<OrderDTO> setDelivered(@PathVariable Long id) {

        return ResponseEntity.ok(orderService.setDelivered(id));
    }
}