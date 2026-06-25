package com.creditchaser.controller;

import com.creditchaser.functions.InvoiceFunction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/invoices/")
public class InvoiceController {

    private final InvoiceFunction invoiceFunction;

    InvoiceController(InvoiceFunction invoiceFunction) {
        this.invoiceFunction = invoiceFunction;
    }

    @GetMapping("next_7_days")
    private ResponseEntity<Object> findAllInvoicesDueNext7Days() {
        try {
            return ResponseEntity.ok().body(invoiceFunction.findAllDueNext7Days());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(String.format("Something went wrong! \n %s", e.getMessage()));
        }
    }
}
