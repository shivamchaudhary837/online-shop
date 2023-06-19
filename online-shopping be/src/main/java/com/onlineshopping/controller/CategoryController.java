package com.onlineshopping.controller;

import com.onlineshopping.model.Category;
import com.onlineshopping.service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/category")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("all")
    public ResponseEntity<List<Category>> getAllCategories() {
        
        List<Category> categories = categoryService.getAllCategories();
        System.out.println("Response sent");
        return ResponseEntity.ok(categories);
    }

    @PostMapping("add")
    public ResponseEntity<Category> add(@RequestBody Category category) {
        
        Category addedCategory = categoryService.addCategory(category);
        
        if (addedCategory != null) {
            return ResponseEntity.ok(addedCategory);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
