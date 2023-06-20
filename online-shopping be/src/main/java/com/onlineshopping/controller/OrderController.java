package com.onlineshopping.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.onlineshopping.dto.MyOrderResponse;
import com.onlineshopping.dto.PayRequest;
import com.onlineshopping.dto.UpdateDeliveryStatusRequest;
import com.onlineshopping.model.Orders;
import com.onlineshopping.service.OrderService;

@RestController
@RequestMapping("api/user/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("order")
    public ResponseEntity<?> customerOrder(@RequestBody PayRequest payRequest) {
    	System.out.println("ehllooooooooooooo");
        try {
        	List<Orders> orderList = orderService.customerOrder(payRequest);
             
            
            if (orderList != null) {
              
                return ResponseEntity.ok(orderList);
                
            }
            else {
            	//something went wrong
            	
            	return ResponseEntity.ok("Not Sufficient money");
            }
        }
        catch (Exception e) {
			// TODO: handle exception
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
		}
    }

    @GetMapping("myorder")
    public ResponseEntity<?> getMyOrder(@RequestParam("userId") int userId) {
        try {
            List<MyOrderResponse> resultList = orderService.getMyOrder(userId);
            return ResponseEntity.ok(resultList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @GetMapping("admin/allorder")
    public ResponseEntity<?> getAllOrder() {
        try {
            List<MyOrderResponse> orderList = orderService.getAllOrder();
            return ResponseEntity.ok(orderList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @GetMapping("admin/showorder")
    public ResponseEntity<?> getOrdersByOrderId(@RequestParam("orderId") String orderId) {
        try {
            List<MyOrderResponse> resultList = orderService.getOrdersByOrderId(orderId);
            return ResponseEntity.ok(resultList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @PostMapping("admin/order/deliveryStatus/update")
    public ResponseEntity<?> updateOrderDeliveryStatus(
             @RequestBody UpdateDeliveryStatusRequest deliveryRequest) {
        try {
            List<MyOrderResponse> resultList = orderService.updateOrderDeliveryStatus(deliveryRequest);
            return ResponseEntity.ok(resultList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @PostMapping("admin/order/assignDelivery")
    public ResponseEntity<?> assignDeliveryPersonForOrder(
             @RequestBody UpdateDeliveryStatusRequest deliveryRequest) {
    	
        try {
            List<MyOrderResponse> resultList = orderService.assignDeliveryPersonForOrder(deliveryRequest);
            return ResponseEntity.ok(resultList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @GetMapping("delivery/myorder")
    public ResponseEntity<?> getMyDeliveryOrders(
            @RequestParam("deliveryPersonId") int deliveryPersonId) {
    	
        try {
            List<MyOrderResponse> orderDataList = orderService.getMyDeliveryOrders(deliveryPersonId);
            return ResponseEntity.ok(orderDataList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }
}
