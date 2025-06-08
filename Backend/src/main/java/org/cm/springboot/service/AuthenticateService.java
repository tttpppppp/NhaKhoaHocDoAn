package org.cm.springboot.service;

import org.cm.springboot.controller.response.TokenResponse;
import org.cm.springboot.controller.resquest.SigninRequest;
import org.springframework.stereotype.Service;


public interface AuthenticateService{
    TokenResponse getAccessToken(SigninRequest signinRequest);
    TokenResponse getRefeshToken(SigninRequest signinRequest);
}
