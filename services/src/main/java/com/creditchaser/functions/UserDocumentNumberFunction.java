package com.creditchaser.functions;

import com.creditchaser.entities.User;
import com.creditchaser.entities.UserDocumentNumber;
import com.creditchaser.repository.UserDocumentNumberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDocumentNumberFunction {

	private UserDocumentNumberRepository userDocumentNumberRepository;

	public UserDocumentNumberFunction(UserDocumentNumberRepository userDocumentNumberRepository) {
		this.userDocumentNumberRepository = userDocumentNumberRepository;
	}

	@Transactional
	public void incrementDocumentNumber(UserDocumentNumber number) {
		UserDocumentNumber userDocumentNumber = userDocumentNumberRepository.findById(number.getId()).orElse(null);
		if (userDocumentNumber == null) throw new IllegalStateException(
			"Unable to find next available document number"
		);
		userDocumentNumber.setDocumentNumber(userDocumentNumber.getDocumentNumber() + 1);
		userDocumentNumberRepository.save(userDocumentNumber);
	}

    public Long getDocumentNumberByUser(User user) {
        UserDocumentNumber userDocumentNumber = userDocumentNumberRepository.findByUser(user).orElse(null);
        if (userDocumentNumber == null) throw new IllegalStateException(
				"Unable to find next available document number"
		);
		return  userDocumentNumber.getDocumentNumber();
    }
}
