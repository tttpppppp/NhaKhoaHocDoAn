package org.cm.springboot.controller.resquest;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserUpdateRequest {
    @NotNull(message = "Userid không được để trống")
    @Min(value = 1 , message = "Userid phải lớn hơn hoặc bằng 1")
    private int user_id;
    @Email(message = "Email không đúng đinh dạng")
    private String email;
    @NotBlank(message = "Fullname không được để trống")
    private String fullname;
    private String mobile;

}
