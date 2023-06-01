package com.onlineshopping.controller;



import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.onlineshopping.dao.AddressDao;
import com.onlineshopping.dao.UserDao;
import com.onlineshopping.dto.AddUserRequest;
import com.onlineshopping.dto.DuplicateUserExecption;
import com.onlineshopping.dto.UpdateDeliveryStatusRequest;
import com.onlineshopping.dto.UserLoginRequest;
import com.onlineshopping.dto.UserProfileRequest;
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
	
	@ExceptionHandler(DuplicateUserExecption.class)
    public ResponseEntity<?> handleDuplicateUserException(DuplicateUserExecption ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
	
	@PostMapping("register")
	public ResponseEntity<?> registerUser(@RequestBody AddUserRequest userRequest) throws DuplicateUserExecption{
		System.out.println("recieved request for REGISTER USER");
		System.out.println(userRequest);
		
		User user1=userDao.findByEmailId(userRequest.getEmailId());
		
		if(user1!=null) {
			throw new DuplicateUserExecption("User with this email exist");
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
		
		
		User addUser = userService.registerUser(user);
				
		System.out.println("response sent!!!");
		return ResponseEntity.ok(addUser);
	}
	
	@PostMapping("login")
	public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest) {
		System.out.println("recieved request for LOGIN USER");
		System.out.println(loginRequest);
		
		if(loginRequest.getRole().equals("Customer") == false) return null;
		 
		User user=userService.loginUser(loginRequest);
		
		return ResponseEntity.ok(user);
		
	}
	
	@PostMapping("admin/login")
	public ResponseEntity<?> loginAdmin(@RequestBody UserLoginRequest loginRequest){
		
		System.out.println("recieved request for LOGIN ADMIN USER");
		System.out.println(loginRequest);
		
		if(loginRequest.getRole().equals("Admin") == false) return null;
		
		User userAdmin  =userService.loginAdmin(loginRequest);
		
		return ResponseEntity.ok(userAdmin);
	}
	
	@PostMapping("deliveryperson/login")
	public ResponseEntity<?> loginDeliveryPerson(@RequestBody UserLoginRequest loginRequest){
		
		System.out.println("recieved request for LOGIN delivery person ");
		System.out.println(loginRequest);
		
		if(loginRequest.getRole().equals("Delivery") == false) return null;
		
		User userDelivery  =userService.loginDelivery(loginRequest);
		
		return ResponseEntity.ok(userDelivery);
	}
	
	@GetMapping("deliveryperson/all")
	public ResponseEntity<?> getAllDeliveryPersons() {
		System.out.println("recieved request for getting ALL Delivery Persons!!!");
	
	List<User> deliveryPersons = this.userDao.findByRole("Delivery");
	//List<User> deliveryPersons = this.userService.getAllDeliveryPerson();
		System.out.println("response sent!!!");
		return ResponseEntity.ok(deliveryPersons);
	}
	
	@PostMapping("Wallet/pay")
	public String payAmount(@RequestBody Map<String, String> payData) {
		
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
	
	@PostMapping("Wallet/addMoney")
	public String  addAmount(@RequestBody Map<String, String> payData) {
		
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
	
	@GetMapping ("/checkwalletbalance")
	public String checkBalance(@RequestParam("userId") int userId) {
		Optional<User> user=userDao.findById(userId);
		int walletBalance=0;
		if(user.isPresent()) {
		   walletBalance=user.get().getBalance();
				   
		}
		return ""+walletBalance;
	}
	
	@Transactional
	@DeleteMapping("/email/{email}")
    public void deleteUsersByEmail(@PathVariable String email) {
        userDao.deleteAllByEmailId(email);
    }
	
	@GetMapping("/allUsers")
    public List<User> getAllUsers(){
        return userDao.findAll();}
	
	@PostMapping("profile/{userId}")
	public ResponseEntity<?> updateProfile(@PathVariable Integer userId,@RequestBody UserProfileRequest userProfile){
		
		System.out.println("response for updating profile");
		
		userService.updateProfile(userId,userProfile);
		
		return ResponseEntity.ok(userDao.getById(userId));
	}
	@GetMapping("profile/{userId}")
	public ResponseEntity<?> getUserProfileById(@PathVariable Integer userId){
		
		User user=new User();
		UserProfileRequest upr=userService.getUserProfileById(userId);
		return ResponseEntity.ok(upr);
	}
	@GetMapping("{userId}")
	User getUser(@PathVariable Integer userId) {
		return userDao.getById(userId);
	}
    @GetMapping("/address/{userId}")
	public ResponseEntity<?> getAddress(@PathVariable("userId") Integer userId) {
	    Optional<User> userOptional = userDao.findById(userId);
	    if (userOptional.isPresent()) {
	        User user = userOptional.get();
	        Address address = user.getAddress();
	        return ResponseEntity.ok(address);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
    }
	    @GetMapping("email/{emailId}")
	    public User getUserByEmail(@PathVariable("emailId") String email) {
	    	
	    	 return  userDao.findByEmailId(email);
	    	  
	    }
	
	 
}
