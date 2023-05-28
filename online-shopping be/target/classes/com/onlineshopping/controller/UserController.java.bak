package com.onlineshopping.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.onlineshopping.dao.AddressDao;
import com.onlineshopping.dao.UserDao;
import com.onlineshopping.dto.AddUserRequest;
import com.onlineshopping.dto.UserLoginRequest;
import com.onlineshopping.model.Address;
import com.onlineshopping.model.User;
import com.onlineshopping.service.UserService;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private AddressDao addressDao;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("register")
	public ResponseEntity<?> registerUser(@RequestBody AddUserRequest userRequest) {
		System.out.println("recieved request for REGISTER USER");
		System.out.println(userRequest);
		
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
		user.setPassword(userRequest.getPassword());
		user.setRole(userRequest.getRole());
		//User addUser = userDao.save(user);
		
		User addUser = userService.registerUser(user);
				
		System.out.println("response sent!!!");
		return ResponseEntity.ok(addUser);
	}
	
	@PostMapping("login")
	public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest) {
		System.out.println("recieved request for LOGIN USER");
		System.out.println(loginRequest);
		
		User user = new User();
	
		user=userService.loginUser(loginRequest);
				
		System.out.println("response sent!!!");
		
		return ResponseEntity.ok(user);
	}
	
	@PostMapping("admin/login")
	public ResponseEntity<?> loginAdmin(@RequestBody UserLoginRequest loginRequest){
		
		System.out.println("recieved request for LOGIN ADMIN USER");
		System.out.println(loginRequest);
		
		User userAdmin = new User();
//		
//		userAdmin = userDao.
//				findByEmailIdAndPasswordAndRole
//			(loginRequest.getEmailId(), loginRequest.getPassword(), "Admin");
		
		userAdmin =userService.loginAdmin(loginRequest);
		
		return ResponseEntity.ok(userAdmin);
	}
	
//	@GetMapping("deliveryperson/all")
//	public ResponseEntity<?> getAllDeliveryPersons() {
//		System.out.println("recieved request for getting ALL Delivery Persons!!!");
//		
//		List<User> deliveryPersons = this.userDao.findByRole("Delivery");
//		//List<User> deliveryPersons = this.userService.getAllDeliveryPerson();
//		System.out.println("response sent!!!");
//		return ResponseEntity.ok(deliveryPersons);
//	}
	
}
