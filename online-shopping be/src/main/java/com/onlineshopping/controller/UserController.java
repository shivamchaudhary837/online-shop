package com.onlineshopping.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.onlineshopping.dao.AddressDao;
import com.onlineshopping.dao.UserDao;
import com.onlineshopping.dto.AddUserRequest;
import com.onlineshopping.dto.DuplicateUserExecption;
import com.onlineshopping.dto.UserLoginRequest;
import com.onlineshopping.dto.UserProfileRequest;
import com.onlineshopping.model.Address;
import com.onlineshopping.model.User;
import com.onlineshopping.service.UserService;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserDao userDao;
    private final AddressDao addressDao;
    private final UserService userService;

    @Autowired
    public UserController(UserDao userDao, AddressDao addressDao, UserService userService) {
        this.userDao = userDao;
        this.addressDao = addressDao;
        this.userService = userService;
    }

    @ExceptionHandler(DuplicateUserExecption.class)
    public ResponseEntity<?> handleDuplicateUserException(DuplicateUserExecption ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @PostMapping("register")
    public ResponseEntity<?> registerUser(@RequestBody AddUserRequest userRequest) {
        try {
            User addUser = userService.registerUser(userRequest);
            return ResponseEntity.ok(addUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest loginRequest) {
        try {
            if (!loginRequest.getRole().equals("Customer")) return null;
            User user = userService.loginUser(loginRequest);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @PostMapping("admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody UserLoginRequest loginRequest) {
        try {
            if (!loginRequest.getRole().equals("Admin")) return null;
            User userAdmin = userService.loginAdmin(loginRequest);
            return ResponseEntity.ok(userAdmin);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @PostMapping("deliveryperson/login")
    public ResponseEntity<?> loginDeliveryPerson(@RequestBody UserLoginRequest loginRequest) {
        try {
            if (!loginRequest.getRole().equals("Delivery")) return null;
            User userDelivery = userService.loginDelivery(loginRequest);
            return ResponseEntity.ok(userDelivery);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @GetMapping("deliveryperson/all")
    public ResponseEntity<?> getAllDeliveryPersons() {
        try {
            List<User> deliveryPersons = userService.getAllDeliveryPersons();
            return ResponseEntity.ok(deliveryPersons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @PostMapping("Wallet/pay")
    public String payAmount(@RequestBody Map<String, String> payData) {
        try {
            String result = userService.payAmount(payData);
            return result;
        } catch (Exception e) {
            return "Error occurred: " + e.getMessage();
        }
    }

    @PostMapping("Wallet/addMoney")
    public String addAmount(@RequestBody Map<String, String> payData) {
        try {
            String result = userService.addAmount(payData);
            return result;
        } catch (Exception e) {
            return "Error occurred: " + e.getMessage();
        }
    }

    @GetMapping("/checkwalletbalance")
    public String checkBalance(@RequestParam("userId") int userId) {
        try {
            String resultString = userService.checkBalance(userId);
            return resultString;
        } catch (Exception e) {
            return "Error occurred: " + e.getMessage();
        }
    }

    @Transactional
    @DeleteMapping("/email/{email}")
    public void deleteUsersByEmail(@PathVariable String email) {
        userDao.deleteAllByEmailId(email);
    }

    @GetMapping("/allUsers")
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    @PostMapping("profile/{userId}")
    public ResponseEntity<?> updateProfile(@PathVariable Integer userId, @RequestBody UserProfileRequest userProfile) {
        try {
            User user = userService.updateProfile(userId, userProfile);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @GetMapping("profile/{userId}")
    public ResponseEntity<?> getUserProfileById(@PathVariable Integer userId) {
        try {
            User user = new User();
            UserProfileRequest upr = userService.getUserProfileById(userId);
            return ResponseEntity.ok(upr);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @GetMapping("{userId}")
    User getUser(@PathVariable Integer userId) {
        return userDao.getById(userId);
    }

    @GetMapping("/address/{userId}")
    public ResponseEntity<?> getAddress(@PathVariable("userId") Integer userId) {
        try {
            Optional<User> userOptional = userDao.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Address address = user.getAddress();
                return ResponseEntity.ok(address);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @GetMapping("email/{emailId}")
    public User getUserByEmail(@PathVariable("emailId") String email) {
        return userDao.findByEmailId(email);
    }
}
