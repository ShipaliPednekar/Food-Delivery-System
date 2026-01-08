package com.fooddelivery.backend.repository;

import com.fooddelivery.backend.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {

    // 🔹 For Track Order page (latest order)
    Order findTopByOrderByIdDesc();

    // 🔹 For Delivery Partner (fetch READY orders)
    List<Order> findByStatus(String status);
}
