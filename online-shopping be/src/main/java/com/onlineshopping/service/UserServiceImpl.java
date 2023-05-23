package com.onlineshopping.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlineshopping.dao.UserDao;
import com.onlineshopping.dto.UserLoginRequest;
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
        User userAdmin = new User();
		
		userAdmin = userDao.
				findByEmailIdAndPasswordAndRole
			    (loginRequest.getEmailId(), loginRequest.getPassword(), "Admin");
		
		return userAdmin;
	}

	@Override
	public User loginUser(UserLoginRequest loginRequest) {
		// TODO Auto-generated method stub
		
		User user = new User();
		
		user = userDao.
				findByEmailIdAndPasswordAndRole
				(loginRequest.getEmailId(), loginRequest.getPassword(), loginRequest.getRole());
		
		return user;
	}

}
