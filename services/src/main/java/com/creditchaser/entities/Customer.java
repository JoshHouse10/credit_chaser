package com.creditchaser.entities;

import com.creditchaser.dto.CustomerDto;
import jakarta.persistence.Entity;

import java.math.BigDecimal;
import java.util.Objects;

@Entity
public class Customer extends BaseEntity {

    private String firstName;
    private String lastName;
    private String email;
    private String contactNumber;
    private BigDecimal balance;
    private BigDecimal overdueBalance;

    public Customer() {
    }

    public Customer(String firstName, String lastName, String email, String contactNumber,
                    BigDecimal balance, BigDecimal overdueBalance) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contactNumber = contactNumber;
        this.balance = balance;
        this.overdueBalance = overdueBalance;
    }

    /** Build a Customer entity from its DTO (e.g. an incoming request from the front end). */
    public Customer(CustomerDto dto) {
        setId(dto.getId());
        this.firstName = dto.getFirstName();
        this.lastName = dto.getLastName();
        this.email = dto.getEmail();
        this.contactNumber = dto.getContactNumber();
        this.balance = dto.getBalance();
        this.overdueBalance = dto.getOverdueBalance();
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public BigDecimal getOverdueBalance() {
        return overdueBalance;
    }

    public void setOverdueBalance(BigDecimal overdueBalance) {
        this.overdueBalance = overdueBalance;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Customer other)) return false;   // instanceof handles proxies for this simple case
        return getId() != null && Objects.equals(getId(), other.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
