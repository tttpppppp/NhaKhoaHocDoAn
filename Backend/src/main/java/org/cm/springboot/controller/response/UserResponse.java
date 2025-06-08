package org.cm.springboot.controller.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Setter
@Getter
public class UserResponse implements Serializable {
    private int userId;
    private String email;
    private String fullname;
    private String mobile;
    private List<RoleResponse> role;


    @Override
    public String toString() {
        return "UserResponse{" +
                "userId=" + userId +
                ", email='" + email + '\'' +
                ", fullname='" + fullname + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
