package com.fooddelivery.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    private String userName;
    private String restaurantId;
    private List<String> foodIds;
    private double totalAmount;

    // Order Status: PLACED, PREPARING, ON_THE_WAY, DELIVERED
    private String status = "PLACED";

    private LocalDateTime createdAt;

    // ✅ Default constructor
    public Order() {
        this.createdAt = LocalDateTime.now();
        this.status = "PLACED";
    }

    // ✅ Parameterized constructor
    public Order(String userName, String restaurantId, List<String> foodIds, double totalAmount) {
        this.userName = userName;
        this.restaurantId = restaurantId;
        this.foodIds = foodIds;
        this.totalAmount = totalAmount;
        this.status = "PLACED";
        this.createdAt = LocalDateTime.now();
    }

    // ✅ Getters
    public String getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public List<String> getFoodIds() {
        return foodIds;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // ✅ Setters
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public void setFoodIds(List<String> foodIds) {
        this.foodIds = foodIds;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
