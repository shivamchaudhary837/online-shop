package com.onlineshopping.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.onlineshopping.dto.MyOrderResponse;
import com.onlineshopping.dto.PayRequest;
import com.onlineshopping.dto.UpdateDeliveryStatusRequest;
import com.onlineshopping.model.Orders;

public interface OrderService {

	List<MyOrderResponse> getMyDeliveryOrders(@RequestParam("deliveryPersonId") int deliveryPersonId) throws JsonProcessingException;
	
	List<MyOrderResponse> assignDeliveryPersonForOrder(@RequestBody UpdateDeliveryStatusRequest deliveryRequest) throws JsonProcessingException;
	
	
	List<MyOrderResponse> updateOrderDeliveryStatus(@RequestBody UpdateDeliveryStatusRequest deliveryRequest) throws JsonProcessingException;
	
	List<MyOrderResponse> getOrdersByOrderId(@RequestParam("orderId") String orderId) throws JsonProcessingException;
	
	List<MyOrderResponse> getAllOrder() throws JsonProcessingException;
	
	List<MyOrderResponse> getMyOrder(@RequestParam("userId") int userId) throws JsonProcessingException;
	
	List<Orders>  customerOrder(@RequestBody PayRequest pRequest) throws JsonProcessingException;
}
