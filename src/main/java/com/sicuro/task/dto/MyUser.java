package com.sicuro.task.dto;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
public class MyUser implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	@Size(min = 5, max = 30, message = "Enter Username between 5~30 charecters")
	private String userName;
	@Size(min = 5, max = 30, message = "Enter Firstname between 5~30 charecters")
	private String firstName;
	@Size(min = 5, max = 30, message = "Enter Lastname between 5~30 charecters")
	private String lastName;
	@NotNull(message = "It is Required")
	@Email(message = "Enter Proper Email")
	private String email;
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{6,}$", message = "password must cntain atleast one uppercase,one lowercase,one number and one special character")
	private String password;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getUsername() {
		return userName;
	}

	public String getUserName() {
		return userName;
	}
}
