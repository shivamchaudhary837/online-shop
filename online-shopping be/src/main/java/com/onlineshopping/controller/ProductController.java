package com.onlineshopping.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
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
import com.onlineshopping.dto.ProductAddRequest;
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
	private StorageService storageService;
	
	
	
	@GetMapping("all")
    public ResponseEntity<?> getAllProducts() {
		
        try {
            List<Product> products = productService.getAllProducts();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve products.");
        }
    }
	
	 @PostMapping("update/{productId}")
	  public ResponseEntity<?> updateProduct(@PathVariable Integer productId, @RequestBody String inStocks) {
	        try {
	            Product product = productService.updateProduct(productId, inStocks);
	            return ResponseEntity.ok(product);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update product.");
	        }
	    }
	 
	@GetMapping("/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Integer productId) {
        try {
            Product product = productService.getProductById(productId);
            if (product != null) {
                return ResponseEntity.ok(product);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve product.");
        }
    }
	
	
	
	
	@GetMapping("category")
	public ResponseEntity<List<Product>> getProductsByCategories(@RequestParam("categoryId") int categoryId) {
		
		
		try {
		List<Product> productList=productService.getProductsByCategories(categoryId);
		return ResponseEntity.ok(productList);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
		
	}
	
	 @GetMapping(value = "/{productImageName}", produces = "image/*")
	 public void fetchProductImage(@PathVariable("productImageName") String productImageName, HttpServletResponse resp) {
		 
	        try {
	            Resource resource = storageService.load(productImageName);
	            
	            if (resource != null) {
	                try (InputStream in = resource.getInputStream()) {
	                    ServletOutputStream out = resp.getOutputStream();
	                    FileCopyUtils.copy(in, out);
	                } catch (IOException e) {
	                    e.printStackTrace();
	                }
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	   }
	
	    @GetMapping("search/{keyword}")
	    public ResponseEntity<?> searchProducts(@PathVariable("keyword") String keyword) {
	        try {
	            List<Product> list = productService.searchProducts(keyword);
	            return ResponseEntity.ok(list);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to search products.");
	        }
	    }
	    
	    @GetMapping("id")
	    public ResponseEntity<?> getProductById(@RequestParam("productId") int productId) {
			
			try {
			Product product = productService.getProductById(productId);
			
			return ResponseEntity.ok(product);
			}
			catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
			}
		}
	    
	    
	    @PostMapping("add")
		public ResponseEntity<?> addProduct(ProductAddRequest productDto) {
			
			try {
			Product resProduct=productService.addProduct(productDto);
			return ResponseEntity.ok(resProduct);
			}
			catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
			}
		}
	    
	    
}
