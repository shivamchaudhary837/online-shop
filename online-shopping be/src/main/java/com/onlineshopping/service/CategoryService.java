package com.onlineshopping.service;

import com.onlineshopping.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();
    Category addCategory(Category category);
}
