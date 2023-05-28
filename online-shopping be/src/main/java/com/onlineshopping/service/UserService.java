package com.onlineshopping.service;

import com.onlineshopping.dto.UserLoginRequest;
import com.onlineshopping.dto.UserProfileRequest;
import com.onlineshopping.model.User;

public interface UserService {

	
	public User registerUser(User user);

	public User loginAdmin(UserLoginRequest loginRequest);

	public User loginUser(UserLoginRequest loginRequest);

	public UserProfileRequest getUserProfileById(Integer userId);

	public void updateProfile(Integer userId, UserProfileRequest userProfile);
}
