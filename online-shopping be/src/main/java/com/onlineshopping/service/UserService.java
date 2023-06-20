package com.onlineshopping.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.onlineshopping.dto.AddUserRequest;
import com.onlineshopping.dto.UserLoginRequest;
import com.onlineshopping.dto.UserProfileRequest;
import com.onlineshopping.model.User;

public interface UserService {

	
	 User registerUser(@RequestBody AddUserRequest userRequest);

	 User loginAdmin(UserLoginRequest loginRequest);

	 User loginUser(UserLoginRequest loginRequest);

	 UserProfileRequest getUserProfileById(Integer userId);

	 User updateProfile(Integer userId, UserProfileRequest userProfile);

	 User loginDelivery(UserLoginRequest loginRequest);
	//
	 List<User> getAllDeliveryPersons();
	 
	 String payAmount(@RequestBody Map<String, String> payData);
	 String  addAmount(@RequestBody Map<String, String> payData);
	 
	 String checkBalance(@RequestParam("userId") int userId);
}
