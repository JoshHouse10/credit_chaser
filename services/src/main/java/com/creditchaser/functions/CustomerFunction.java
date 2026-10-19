package com.creditchaser.functions;

import com.creditchaser.dto.CustomerDto;
import com.creditchaser.entities.Customer;
import com.creditchaser.entities.Invoice;
import com.creditchaser.repository.CustomerRepository;
import com.creditchaser.repository.InvoiceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;
@Service

public class CustomerFunction {

    private final CustomerRepository customerRepository;
    private final InvoiceRepository invoiceRepository;

    CustomerFunction(CustomerRepository customerRepository, InvoiceRepository invoiceRepository) {
        this.customerRepository = customerRepository;
        this.invoiceRepository = invoiceRepository;
    }
    @Transactional
    public void calculateCustomerBalances() {
        Map<Customer, BigDecimal> customerOutstandingMap = invoiceRepository.findAll()
                .stream()
                .collect(Collectors.toMap(Invoice::getCustomer, Invoice::getOutstandingTotal, BigDecimal::add));

        List<Customer> customers = new ArrayList<>();
        customerOutstandingMap.entrySet().forEach(
                entry -> {
                    entry.getKey().setBalance(entry.getValue());
                    customers.add(entry.getKey());

                }
        );
        if (!customers.isEmpty()) customerRepository.saveAll(customers);

    }
    public List<CustomerDto> getCustomers() {
        return customerRepository.findAll().stream().map(cus -> new CustomerDto(cus)).toList();
    }
}
