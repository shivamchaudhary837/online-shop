package com.onlineshopping.service;

import com.onlineshopping.dto.UserLoginRequest;
import com.onlineshopping.model.User;

public interface UserService {

	
	public User registerUser(User user);

	public User loginAdmin(UserLoginRequest loginRequest);

	public User loginUser(UserLoginRequest loginRequest);
}
