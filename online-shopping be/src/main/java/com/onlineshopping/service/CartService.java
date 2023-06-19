package com.onlineshopping.service;

import com.onlineshopping.dto.AddToCartRequest;
import com.onlineshopping.dto.CartDataResponse;
import com.onlineshopping.dto.CartResponse;

public interface CartService {
    void addToCart(AddToCartRequest addToCartRequest);
    CartResponse getMyCart(int userId);
    void removeCartItem(int cartId);
}
