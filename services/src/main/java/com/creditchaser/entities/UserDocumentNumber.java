package com.creditchaser.entities;

import jakarta.persistence.*;

@Entity
public class UserDocumentNumber extends BaseEntity {

    @OneToOne()
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;
    private Long documentNumber = 1L;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(Long documentNumber) {
        this.documentNumber = documentNumber;
    }

    public UserDocumentNumber(User user) {
        this.user = user;
    }
}
