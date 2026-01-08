package com.fooddelivery.backend.repository;

import com.fooddelivery.backend.model.Food;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FoodRepository extends MongoRepository<Food, String> {
    List<Food> findByRestaurantId(String restaurantId);
}
