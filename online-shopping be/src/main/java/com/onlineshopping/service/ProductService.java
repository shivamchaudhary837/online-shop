package com.onlineshopping.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.onlineshopping.model.Product;

public interface ProductService {
	
	void addProduct(Product product, MultipartFile productImmage);

	List<Product> searchProducts(String keyword);

}
