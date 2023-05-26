package com.onlineshopping.dto;

public class PayRequest {

	    private int userId;
	    private double priceToPay;
	    private String paymentType;

	    // Constructor
	    public PayRequest(int userId, double priceToPay, String paymentType) {
	        this.userId = userId;
	        this.priceToPay = priceToPay;
	        this.paymentType = paymentType;
	    }

	    // Getter and Setter methods
	    public int getUserId() {
	        return userId;
	    }

	    public void setUserId(int userId) {
	        this.userId = userId;
	    }

	    public double getPriceToPay() {
	        return priceToPay;
	    }

	    public void setPriceToPay(double priceToPay) {
	        this.priceToPay = priceToPay;
	    }

	    public String getPaymentType() {
	        return paymentType;
	    }

	    public void setPaymentType(String paymentType) {
	        this.paymentType = paymentType;
	    }
	}

