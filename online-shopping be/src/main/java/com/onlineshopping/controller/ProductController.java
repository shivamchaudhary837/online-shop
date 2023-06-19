package com.onlineshopping.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.onlineshopping.dao.CategoryDao;
import com.onlineshopping.dao.ProductDao;
import com.onlineshopping.dao.UserDao;
import com.onlineshopping.dto.ProductAddRequest;
import com.onlineshopping.model.Category;
import com.onlineshopping.model.Product;
import com.onlineshopping.service.ProductService;
import com.onlineshopping.utility.StorageService;

@RestController
@RequestMapping("api/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private CategoryDao categoryDao;
	
	@Autowired
	private StorageService storageService;
	
	@Autowired
	private UserDao userDao;
	
//	@PostMapping("add")
//	public ResponseEntity<?> addProduct(ProductAddRequest productDto) {
//		
//		System.out.println("recieved request for ADD PRODUCT");
//		System.out.println(productDto);
//		
//		Product product =productService.addProduct(productDto);
//		
//		return ResponseEntity.ok(product);
//		
//	}
//	
	@PostMapping("add")
	public ResponseEntity<?> addProduct(ProductAddRequest productDto) {
		System.out.println("recieved request for ADD PRODUCT");
		System.out.println(productDto);
		Product product=ProductAddRequest.toEntity(productDto);
		
		Optional<Category> optional = categoryDao.findById(productDto.getCategoryId());
		Category category = null;
		
		if(optional.isPresent()) {
			category = optional.get();
		}
		
		product.setCategory(category);
		productService.addProduct(product, productDto.getImage());
		
		System.out.println("response sent!!!");
		return ResponseEntity.ok(product);
		
	}
	
	@PostMapping("update/{productId}")
	public ResponseEntity<?> updateProduct(@PathVariable Integer productId,@RequestBody String inStocks){
		
		
		Product product=productService.updateProduct(productId,inStocks);
		
		return ResponseEntity.ok(product);
	}
	
	@GetMapping("all")
	public ResponseEntity<?> getAllProducts() {
		
		List<Product> products = productService.getAllProducts();
		
		return ResponseEntity.ok(products);
		
	}
	
	@GetMapping("/{productId}")
	public ResponseEntity<?> getProductById(@PathVariable Integer productId) {
		
		Product product = productService.getProductById(productId);
	
		return ResponseEntity.ok(product);
		
	}
	
     
	
	@GetMapping("id")
    public ResponseEntity<?> getProductById(@RequestParam("productId") int productId) {
		
		
		Product product = productService.getProductById(productId);
		
		return ResponseEntity.ok(product);
		
	}
	
	@GetMapping("category")
	public ResponseEntity<List<Product>> getProductsByCategories(@RequestParam("categoryId") int categoryId) {
		
		
		
		List<Product> productList=productService.getProductsByCategories(categoryId);
		
		return ResponseEntity.ok(productList);
		
	}
	
	@GetMapping(value="/{productImageName}", produces = "image/*")
	public void fetchProductImage(@PathVariable("productImageName") String productImageName, HttpServletResponse resp) {
		System.out.println("request came for fetching product pic");
		System.out.println("Loading file: " + productImageName);
		
		Resource resource = storageService.load(productImageName);
		
		if(resource != null) {
			try(InputStream in = resource.getInputStream()) {
				ServletOutputStream out = resp.getOutputStream();
				FileCopyUtils.copy(in, out);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		System.out.println("response sent!");
	}
	
	@GetMapping("search/{keyword}")
	public ResponseEntity<List<Product>> searchProducts(@PathVariable("keyword") String keyword){
		
		
		List<Product> list=productService.searchProducts(keyword);
		
		return ResponseEntity.ok(list);
	}

}
