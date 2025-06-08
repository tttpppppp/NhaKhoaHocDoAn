package org.cm.springboot.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.cm.springboot.controller.response.TokenResponse;
import org.cm.springboot.controller.resquest.SigninRequest;
import org.cm.springboot.exception.ResourceNotFoundException;
import org.cm.springboot.model.Users;
import org.cm.springboot.repository.UserRepository;
import org.cm.springboot.service.AuthenticateService;
import org.cm.springboot.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Slf4j
@Service
public class AuthenticateServiceImpl implements AuthenticateService {
    Logger logger = Logger.getLogger(AuthenticateServiceImpl.class.getName());
    @Autowired
    JwtService jwtService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;

    @Override
    public TokenResponse getAccessToken(SigninRequest signinRequest) {
        logger.info("Get Access Token");
        List<String> authorities = new ArrayList<>();
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword())
            );
            logger.info(authentication.getAuthorities().toString());
            authorities.add(authentication.getAuthorities().toString());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            throw e;
        }

        String accessToken = jwtService.generateAccessToken(signinRequest.getEmail() ,authorities);
        String refeshToken = jwtService.generateRefeshToken(signinRequest.getEmail() , authorities);

        TokenResponse tokenResponse =  TokenResponse.builder().access_token(accessToken).refresh_token(refeshToken).build();
        return tokenResponse;
    }

    @Override
    public TokenResponse getRefeshToken(SigninRequest signinRequest) {
        return null;
    }
}
