package com.fooddelivery.backend.controller;

import com.fooddelivery.backend.model.Order;
import com.fooddelivery.backend.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // =====================================================
    // 1️⃣ USER: Place Order
    // =====================================================
    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        order.setStatus("Placed"); // default status
        return orderRepository.save(order);
    }

    // =====================================================
    // 2️⃣ RESTAURANT OWNER: View All Orders
    // =====================================================
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // =====================================================
    // 3️⃣ USER: Track Latest Order
    // =====================================================
    @GetMapping("/latest")
    public Order getLatestOrder() {
        return orderRepository.findTopByOrderByIdDesc();
    }

    @GetMapping("/ready")
public List<Order> getReadyOrders() {
    return orderRepository.findByStatus("Ready");
}


    // =====================================================
    // 4️⃣ RESTAURANT OWNER / DELIVERY: Update Order Status
    // =====================================================
    @PutMapping("/{id}/status")
    public Order updateOrderStatus(
            @PathVariable String id,
            @RequestParam String status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        return orderRepository.save(order);
    }
}
