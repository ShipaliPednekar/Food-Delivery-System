package com.fooddelivery.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "foods")
public class Food {

    @Id
    private String id;
    private String name;
    private double price;
    private String restaurantId;

    public Food() {}

    public Food(String name, double price, String restaurantId) {
        this.name = name;
        this.price = price;
        this.restaurantId = restaurantId;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getRestaurantId() {
        return restaurantId;
    }
}
