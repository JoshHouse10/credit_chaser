package com.creditchaser.repository;

import com.creditchaser.entities.User;
import com.creditchaser.entities.UserDocumentNumber;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDocumentNumberRepository extends JpaRepository<UserDocumentNumber, Long> {

    public Optional<UserDocumentNumber> findByUser(User user);
}
