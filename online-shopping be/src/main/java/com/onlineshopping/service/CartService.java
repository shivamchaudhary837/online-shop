package com.onlineshopping.service;

import com.onlineshopping.model.Cart;

public interface CartService {

	public void add(Cart cart);
	public void removeCartItem();
}
