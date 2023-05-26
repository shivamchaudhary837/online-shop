package com.onlineshopping.dao;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.onlineshopping.model.User;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {
	
	User findByEmailIdAndPasswordAndRole(String emailId, String password, String role);
	User findByEmailIdAndPassword(String emailId,String password);
	List<User> findByRole(String role);
	User findByEmailId(String emailId);
	void deleteAllByEmailId(String email);
	


}
