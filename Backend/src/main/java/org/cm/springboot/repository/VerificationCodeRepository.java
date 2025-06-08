package org.cm.springboot.repository;

import org.cm.springboot.model.EmailVerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationCodeRepository extends JpaRepository<EmailVerificationCode , Integer> {
    EmailVerificationCode findBySecretCode(String id);
}
