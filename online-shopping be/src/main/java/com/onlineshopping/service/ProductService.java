package com.onlineshopping.service;

import java.util.List;



import com.onlineshopping.dto.ProductAddRequest;
import com.onlineshopping.model.Product;

public interface ProductService {
	

	List<Product> searchProducts(String keyword);

	List<Product> getProductsByCategories(int categoryId);

	Product getProductById(Integer productId);

	List<Product> getAllProducts();

	Product updateProduct(Integer productId, String inStocks);

	Product addProduct(ProductAddRequest productDto);

}
