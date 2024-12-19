package com.sicuro.task.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class MySecurityConfiguration {

	@Bean
	PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}
	

	@Autowired
	UserDetailsService userDetailsService;

	@Bean
	SecurityFilterChain chain(HttpSecurity security) throws Exception {
		security.csrf(x -> x.disable())
				.authorizeHttpRequests(
						req -> req.requestMatchers("/api/users").permitAll().anyRequest().authenticated())
				.formLogin(t -> t.disable()).httpBasic(Customizer.withDefaults());

		return security.build();
	}

	@Bean
	AuthenticationProvider provider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(encoder());
		return provider;
	}

}
