package org.cm.springboot.service;

import org.cm.springboot.model.EmailVerificationCode;

public interface VerificationCodeService {
    boolean saveCode(int userid ,String id);
    EmailVerificationCode checkCode(String id);
}
