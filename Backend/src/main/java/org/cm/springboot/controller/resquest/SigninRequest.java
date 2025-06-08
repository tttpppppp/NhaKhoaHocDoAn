package org.cm.springboot.controller.resquest;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
public class SigninRequest implements Serializable {
    private String email;
    private String password;
    private String platform;
    private String deviceToken;
    private String versionapp;

}
