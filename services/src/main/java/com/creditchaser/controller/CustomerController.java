package com.creditchaser.controller;

import com.creditchaser.dto.CustomerDto;
import com.creditchaser.functions.CustomerFunction;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

	private final CustomerFunction customerFunction;

	CustomerController(CustomerFunction customerFunction) {
		this.customerFunction = customerFunction;
	}

	@GetMapping
	public ResponseEntity<Object> getCustomers() {
		try {
			List<CustomerDto> customers = customerFunction.getCustomers();
			return ResponseEntity.ok().body(customers);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
}
