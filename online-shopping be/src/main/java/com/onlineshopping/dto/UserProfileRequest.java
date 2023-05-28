package com.onlineshopping.dto;

import com.onlineshopping.model.Address;

public class UserProfileRequest {

	
    private String firstName;
    private String lastName;
	
	private String emailId;
	
	private String phoneNo;
	private Address address;
	private Integer walletAmount;
	
	public Integer getWalletAmount() {
		return walletAmount;
	}

	public void setWalletAmount(Integer walletAmount) {
		this.walletAmount = walletAmount;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public UserProfileRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	
}
