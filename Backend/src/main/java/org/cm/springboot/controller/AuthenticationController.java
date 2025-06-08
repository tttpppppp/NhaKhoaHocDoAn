package org.cm.springboot.controller;

import lombok.extern.slf4j.Slf4j;
import org.cm.springboot.controller.response.TokenResponse;
import org.cm.springboot.controller.resquest.SigninRequest;
import org.cm.springboot.payload.DataResponse;
import org.cm.springboot.service.AuthenticateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;


@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    AuthenticateService authenticateService;
    Logger logger = Logger.getLogger(AuthenticationController.class.getName());

    @PostMapping("/login")
    public ResponseEntity<?> signin(@RequestBody SigninRequest signinRequest) {
        logger.info("Signing user");
        return new ResponseEntity<>(new DataResponse(HttpStatus.OK.value(), "Đăng nhập thành công" , authenticateService.getAccessToken(signinRequest)),HttpStatus.OK);
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(
                new DataResponse(HttpStatus.OK.value(), "Đăng xuất thành công")
        );
    }
}
