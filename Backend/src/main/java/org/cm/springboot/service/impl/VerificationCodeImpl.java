package org.cm.springboot.service.impl;

import org.cm.springboot.model.EmailVerificationCode;
import org.cm.springboot.repository.VerificationCodeRepository;
import org.cm.springboot.service.VerificationCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VerificationCodeImpl implements VerificationCodeService {

    @Autowired
    VerificationCodeRepository verificationCodeRepository;

    @Override
    public boolean saveCode(int userid, String id) {
       try {
           EmailVerificationCode emailVerificationCode = new EmailVerificationCode();
           emailVerificationCode.setUser_id(userid);
           emailVerificationCode.setSecretCode(id);
           verificationCodeRepository.save(emailVerificationCode);
           return true;
       }catch (Exception e){
           return false;
       }
    }

    @Override
    public EmailVerificationCode checkCode(String id) {
        return verificationCodeRepository.findBySecretCode(id);
    }
}
