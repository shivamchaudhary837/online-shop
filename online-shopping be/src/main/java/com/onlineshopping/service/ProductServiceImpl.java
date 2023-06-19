package com.onlineshopping.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.onlineshopping.dao.CategoryDao;
import com.onlineshopping.dao.ProductDao;
import com.onlineshopping.dto.ProductAddRequest;
import com.onlineshopping.model.Category;
import com.onlineshopping.model.Product;
import com.onlineshopping.utility.StorageService;


@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired 
	private ProductDao productDao;
	
	@Autowired
	private CategoryDao categoryDao;
	
	@Autowired
	private StorageService storageService;

	

	@Override
	public List<Product> searchProducts(String keyword) {
		// TODO Auto-generated method stub
		return productDao.findByTitleContainingIgnoreCase(keyword);
	}

	@Override
	public List<Product> getProductsByCategories(int categoryId) {
		// TODO Auto-generated method stub
		List<Product> productList = new ArrayList<Product>();
		
		productList	=productDao.findByCategoryId(categoryId);
		return productList;
	}

	@Override
	public Product getProductById(Integer productId) {
		// TODO Auto-generated method stub
		Optional<Product> result = productDao.findById(productId);
		
		if(result.isPresent()) {
			return result.get();
		}
		return null;
	}

	@Override
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		List<Product> productList=productDao.findAll();
		return productList;
	}

	@Override
	public Product updateProduct(Integer productId, String inStocks) {
		// TODO Auto-generated method stub
		Optional<Product> res = productDao.findById(productId);
		Product product=res.get();
		
		    try {
		     String numericString = inStocks.replaceAll("[^0-9]", "");
			Integer stock=Integer.parseInt(numericString);
			product.setQuantity(stock);
			}
			catch(Exception exception) {
				System.out.println("error occurss "+exception.toString());
			} 
		    
		return productDao.save(product);
	}
    
	@Override
	public void addProduct(Product product, MultipartFile productImmage) {
		
		String productImageName = storageService.store(productImmage);
		
		product.setImageName(productImageName);
		
		this.productDao.save(product);
	}
	
//	@Override
//	public Product addProduct(ProductAddRequest productDto) {
//		// TODO Auto-generated method stub
//		
//        Product product=ProductAddRequest.toEntity(productDto);
//			
//		Optional<Category> optional = categoryDao.findById(productDto.getCategoryId());
//		Category category = null;
//		
//		if(optional.isPresent()) {
//			category = optional.get();
//		}
//		
//		product.setCategory(category);
//		
//		MultipartFile productImmage=productDto.getImage();
//		String productImageName = storageService.store(productImmage);
//		product.setImageName(productImageName);
//		
//		//addProduct(product, productDto.getImage());
//		
//		return productDao.save(product);
//	}

	
}
