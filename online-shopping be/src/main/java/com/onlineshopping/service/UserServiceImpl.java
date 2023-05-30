package com.onlineshopping.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.onlineshopping.dao.UserDao;
import com.onlineshopping.dto.UserLoginRequest;
import com.onlineshopping.dto.UserProfileRequest;
import com.onlineshopping.model.Address;
import com.onlineshopping.model.User;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDao userDao;
	
	@Override
	public User registerUser(User user) {
		// TODO Auto-generated method stub
		return userDao.save(user);
	}

	@Override
	public User loginAdmin(UserLoginRequest loginRequest) {
		// TODO Auto-generated method stub
        
		
        String rawPassword = loginRequest.getPassword();
		User userAdmin = userDao.findByEmailIdAndRole(loginRequest.getEmailId(), loginRequest.getRole());
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		
		boolean isMatch = passwordEncoder.matches(rawPassword, userAdmin.getPassword());

		if (isMatch) {
		    return userAdmin;
		} else {
		    return null;
		}
		
	}

	@Override
	public User loginUser(UserLoginRequest loginRequest) {
		// TODO Auto-generated method stub
		
		
		String rawPassword = loginRequest.getPassword();
		User user = userDao.findByEmailIdAndRole(loginRequest.getEmailId(), loginRequest.getRole());

		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		boolean isMatch = passwordEncoder.matches(rawPassword, user.getPassword());

		if (isMatch) {
		    return user;
		} else {
		    return null;
		}
		
	}

	@Override
	public UserProfileRequest getUserProfileById(Integer userId) {
		// TODO Auto-generated method stub
		
		UserProfileRequest upr=new UserProfileRequest();
		Optional<User> res = userDao.findById(userId);
		
		User user=res.get();
		upr.setFirstName(user.getFirstName());
		upr.setLastName(user.getLastName());
		upr.setEmailId(user.getEmailId());
		upr.setPhoneNo(user.getPhoneNo());
		upr.setAddress(user.getAddress());
		upr.setWalletAmount(user.getBalance());
		
		return upr;
	}

	@Override
	public void updateProfile(Integer userId, UserProfileRequest userProfile) {
		// TODO Auto-generated method stub
		User user=userDao.getById(userId);
		
		user.setFirstName(userProfile.getFirstName());
		user.setLastName(userProfile.getLastName());
		user.setEmailId(user.getEmailId());
		user.setPhoneNo(userProfile.getPhoneNo());
		
		Address add=user.getAddress();
		
		add.setStreet(userProfile.getAddress().getStreet());
		add.setCity(userProfile.getAddress().getCity());
		add.setPincode(userProfile.getAddress().getPincode());
		
		user.setAddress(add);
		
		user.setBalance(userProfile.getWalletAmount());
		
		userDao.save(user);
	}

}
