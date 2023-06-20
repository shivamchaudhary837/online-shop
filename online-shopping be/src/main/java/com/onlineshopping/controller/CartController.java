package com.onlineshopping.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlineshopping.dto.AddToCartRequest;
import com.onlineshopping.dto.CartDataResponse;
import com.onlineshopping.dto.CartResponse;
import com.onlineshopping.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user/")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartService cartService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("cart/add")
    public ResponseEntity<?> add(@RequestBody AddToCartRequest addToCartRequest) {


        try {
            cartService.addToCart(addToCartRequest);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("mycart")
    public ResponseEntity<?> getMyCart(@RequestParam("userId") int userId) throws JsonProcessingException {
      
        try {
        CartResponse cartResponse = cartService.getMyCart(userId);
        String json = objectMapper.writeValueAsString(cartResponse);
        System.out.println(json);

        return ResponseEntity.ok(cartResponse);
        }
        catch (Exception e) {
			// TODO: handle exception
        	e.printStackTrace();
        	 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage()); 
		}
    }

    @GetMapping("mycart/remove")
    public ResponseEntity<String> removeCartItem(@RequestParam("cartId") int cartId) {
      

        try {
            cartService.removeCartItem(cartId);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
