package com.fooddelivery.backend.controller;

import com.fooddelivery.backend.model.Food;
import com.fooddelivery.backend.repository.FoodRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "*")
public class FoodController {

    private final FoodRepository foodRepository;

    public FoodController(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    // ✅ 1. Get ALL food items
    // URL: http://localhost:8080/api/foods
    @GetMapping
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    // ✅ 2. Get food items by Restaurant ID
    // URL: http://localhost:8080/api/foods/{restaurantId}
    @GetMapping("/{restaurantId}")
    public List<Food> getFoodByRestaurant(@PathVariable String restaurantId) {
        return foodRepository.findByRestaurantId(restaurantId);
    }

    // ✅ 3. Add new food item
    // URL: POST http://localhost:8080/api/foods
    @PostMapping
    public Food addFood(@RequestBody Food food) {
        return foodRepository.save(food);
    }

    // ✅ 4. Delete food item by ID
    // URL: DELETE http://localhost:8080/api/foods/{id}
    @DeleteMapping("/{id}")
    public void deleteFood(@PathVariable String id) {
        foodRepository.deleteById(id);
    }
}
