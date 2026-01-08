package com.fooddelivery.backend.controller;

import com.fooddelivery.backend.model.Restaurant;
import com.fooddelivery.backend.repository.RestaurantRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "*")
public class RestaurantController {

    private final RestaurantRepository repository;

    public RestaurantController(RestaurantRepository repository) {
        this.repository = repository;
    }

    // GET all restaurants
    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return repository.findAll();
    }

    // POST add restaurant (for testing)
    @PostMapping
    public Restaurant addRestaurant(@RequestBody Restaurant restaurant) {
        return repository.save(restaurant);
    }
}
