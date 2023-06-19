package com.onlineshopping.service;

import com.onlineshopping.dao.CartDao;
import com.onlineshopping.dao.ProductDao;
import com.onlineshopping.dao.UserDao;
import com.onlineshopping.dto.AddToCartRequest;
import com.onlineshopping.dto.CartDataResponse;
import com.onlineshopping.dto.CartResponse;
import com.onlineshopping.model.Cart;
import com.onlineshopping.model.Product;
import com.onlineshopping.model.User;
import com.onlineshopping.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    private final CartDao cartDao;
    private final UserDao userDao;
    private final ProductDao productDao;

    @Autowired
    public CartServiceImpl(CartDao cartDao, UserDao userDao, ProductDao productDao) {
        this.cartDao = cartDao;
        this.userDao = userDao;
        this.productDao = productDao;
    }

    @Override
    public void addToCart(AddToCartRequest addToCartRequest) {
        Optional<User> optionalUser = userDao.findById(addToCartRequest.getUserId());
        User user = optionalUser.orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Product> optionalProduct = productDao.findById(addToCartRequest.getProductId());
        Product product = optionalProduct.orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = new Cart();
        cart.setProduct(product);
        cart.setQuantity(addToCartRequest.getQuantity());
        cart.setUser(user);

        if (product.getQuantity() < addToCartRequest.getQuantity()) {
            throw new RuntimeException("Not enough stock available");
        }

        int diff = product.getQuantity() - addToCartRequest.getQuantity();
        product.setQuantity(diff);
        productDao.save(product);

        cartDao.save(cart);
    }

    @Override
    public CartResponse getMyCart(int userId) {
        List<CartDataResponse> cartDatas = new ArrayList<>();
        List<Cart> userCarts = cartDao.findByUser_id(userId);
        double totalCartPrice = 0;

        for (Cart cart : userCarts) {
            CartDataResponse cartData = new CartDataResponse();
            cartData.setCartId(cart.getId());
            cartData.setProductDescription(cart.getProduct().getDescription());
            cartData.setProductName(cart.getProduct().getTitle());
            cartData.setProductImage(cart.getProduct().getImageName());
            cartData.setQuantity(cart.getQuantity());
            cartData.setProductId(cart.getProduct().getId());

            cartDatas.add(cartData);

            double productPrice = Double.parseDouble(cart.getProduct().getPrice().toString());

            totalCartPrice += cart.getQuantity() * productPrice;
        }

        CartResponse cartResponse = new CartResponse();
        cartResponse.setTotalCartPrice(String.valueOf(totalCartPrice));
        cartResponse.setCartData(cartDatas);

        return cartResponse;
    }

    @Override
    public void removeCartItem(int cartId) {
        Optional<Cart> optionalCart = cartDao.findById(cartId);
        Cart cart = optionalCart.orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartDao.delete(cart);
    }
}
