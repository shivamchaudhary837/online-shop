package com.onlineshopping.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.onlineshopping.dao.AddressDao;
import com.onlineshopping.dao.UserDao;
import com.onlineshopping.dto.AddUserRequest;
import com.onlineshopping.dto.UserLoginRequest;
import com.onlineshopping.dto.UserProfileRequest;
import com.onlineshopping.model.Address;
import com.onlineshopping.model.User;


@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDao userDao;
	
	
	@Autowired
	private AddressDao addressDao;
	

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
	public User updateProfile(Integer userId, UserProfileRequest userProfile) {
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
		
		return userDao.getById(userId);
	}

	@Override
	public User loginDelivery(UserLoginRequest loginRequest) {
		// TODO Auto-generated method stub

        String rawPassword = loginRequest.getPassword();
		User userDeilvery = userDao.findByEmailIdAndRole(loginRequest.getEmailId(), loginRequest.getRole());
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		
		boolean isMatch = passwordEncoder.matches(rawPassword, userDeilvery.getPassword());

		if (isMatch) {
		    return userDeilvery;
		} else {
		    return null;
		}
	}

	@Override
	public List<User> getAllDeliveryPersons() {
		// TODO Auto-generated method stub
		
		List<User> deliveryPersons = this.userDao.findByRole("Delivery");
		
		return deliveryPersons;
	}

	@Override
	public User registerUser(AddUserRequest userRequest) {
		// TODO Auto-generated method stub
		
        User user1=userDao.findByEmailId(userRequest.getEmailId());
		
		if(user1!=null) {
			//throw new DuplicateUserExecption("User with this email exist");
			return null;
		}
		
        
		Address address = new Address();
		address.setCity(userRequest.getCity());
		address.setPincode(userRequest.getPincode());
		address.setStreet(userRequest.getStreet());
		
		Address addAddress = addressDao.save(address);
		
		User user = new User();
		user.setAddress(addAddress);
		user.setEmailId(userRequest.getEmailId());
		user.setFirstName(userRequest.getFirstName());
		user.setLastName(userRequest.getLastName());
		user.setPhoneNo(userRequest.getPhoneNo());
		

		//password encoding
		String password = userRequest.getPassword();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);

        
		user.setPassword(hashedPassword);
		user.setRole(userRequest.getRole());
		user.setBalance(1000);
		
		
		return userDao.save(user);
	}

	@Override
	public String payAmount(Map<String, String> payData) {
		// TODO Auto-generated method stub
		String email = payData.get("email");
		String tempAmount=payData.get("amount");
		Integer amount=Integer.parseInt(tempAmount);
		
		User user = userDao.findByEmailId(email);
		if(user!=null) {
			if(user.getBalance()>amount) {
				user.setBalance(user.getBalance()-amount);
				userDao.save(user);
				return "Amount Payed";
			}
		}
		return "Patyment Failed";
	}

	@Override
	public String addAmount(Map<String, String> payData) {
		// TODO Auto-generated method stub
		String email = payData.get("email");
		String tempAmount=payData.get("amount");
		Integer amount=Integer.parseInt(tempAmount);
		
		User user = userDao.findByEmailId(email);
		if(user!=null) {
			
				user.setBalance(user.getBalance()+amount);
				userDao.save(user);
				return "Amount added";
			
		}
		return "Sorry";
	}

	@Override
	public String checkBalance(int userId) {
		// TODO Auto-generated method stub
		Optional<User> user=userDao.findById(userId);
		int walletBalance=0;
		if(user.isPresent()) {
		   walletBalance=user.get().getBalance();
				   
		}
		return ""+walletBalance;
	}

}
