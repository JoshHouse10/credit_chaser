package com.creditchaser.entities;

import com.creditchaser.dto.InvoiceDto;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Invoice extends  BaseEntity {

    private Long documentNumber;
    private LocalDate documentDate;
    private LocalDate dueDate;
    private BigDecimal invoiceTotal = BigDecimal.ZERO;
    private BigDecimal paidTotal = BigDecimal.ZERO;
    private BigDecimal outstandingTotal = BigDecimal.ZERO;
    @Enumerated(EnumType.STRING)
    private Currency currency;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    public Invoice() {
    }

    public Invoice(Long documentNumber, LocalDate documentDate, LocalDate dueDate, BigDecimal invoiceTotal, BigDecimal paidTotal, BigDecimal outstandingTotal, Currency currency, Customer customer) {
        this.documentNumber = documentNumber;
        this.documentDate = documentDate;
        this.dueDate = dueDate;
        this.invoiceTotal = invoiceTotal;
        this.paidTotal = paidTotal;
        this.outstandingTotal = invoiceTotal.subtract(paidTotal);
        this.currency = currency;
        this.customer = customer;
    }

    /** Build an Invoice entity from its DTO (e.g. an incoming request from the front end). */
    public Invoice(InvoiceDto dto) {
        setId(dto.getId());
        this.documentNumber = dto.getDocumentNumber();
        this.documentDate = dto.getDocumentDate();
        this.dueDate = dto.getDueDate();
        this.invoiceTotal = dto.getInvoiceTotal();
        this.paidTotal = dto.getPaidTotal();
        this.outstandingTotal = dto.getOutstandingTotal();
        this.currency = dto.getCurrency();
        this.customer = dto.getCustomer() != null ? new Customer(dto.getCustomer()) : null;
    }

    public Long getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(Long documentNumber) {
        this.documentNumber = documentNumber;
    }

    public LocalDate getDocumentDate() {
        return documentDate;
    }

    public void setDocumentDate(LocalDate documentDate) {
        this.documentDate = documentDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public BigDecimal getInvoiceTotal() {
        return invoiceTotal;
    }

    public void setInvoiceTotal(BigDecimal invoiceTotal) {
        this.invoiceTotal = invoiceTotal;
    }

    public BigDecimal getPaidTotal() {
        return paidTotal;
    }

    public void setPaidTotal(BigDecimal paidTotal) {
        this.paidTotal = paidTotal;
    }

    public BigDecimal getOutstandingTotal() {
        return outstandingTotal;
    }

    public void setOutstandingTotal(BigDecimal outstandingTotal) {
        this.outstandingTotal = outstandingTotal;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
