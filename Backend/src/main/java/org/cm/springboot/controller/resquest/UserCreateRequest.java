package org.cm.springboot.controller.resquest;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserCreateRequest {
    @Email(message = "Email không đúng đinh dạng")
    private String email;
    @NotBlank(message = "Fullname không được để trống")
    private String fullname;
    private String mobile;
    private String password;


}
