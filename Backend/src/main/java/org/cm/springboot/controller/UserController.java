package org.cm.springboot.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.cm.springboot.controller.response.UserPageResponse;
import org.cm.springboot.controller.resquest.UserUpdateRequest;
import org.cm.springboot.model.EmailVerificationCode;
import org.cm.springboot.service.UserService;
import org.cm.springboot.service.VerificationCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.cm.springboot.payload.DataResponse;
import org.cm.springboot.controller.resquest.UserCreateRequest;
import org.cm.springboot.controller.response.UserResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/user")
//@Tag(name = "Quản lý người dùng" , description = "quản lý người dùng")
@Validated
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private VerificationCodeService verificationCodeService;


//    @Operation(summary = "Lấy tất cả người dùng")
    @GetMapping("/list")
    @PreAuthorize("hasAnyAuthority('ADMIN' , 'MANAGER')")
    public ResponseEntity<DataResponse> list(@RequestParam(required = false) String keyword,
                                             @RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size ) {
        UserPageResponse userPageResponse = userService.getAllUsers(keyword ,page, size);
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value(), "Lấy dữ liệu thành công" , userPageResponse));
    }

//    @Operation(summary = "Lấy chi tiết người dùng")
    @GetMapping("/{userid}")
    @PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<DataResponse> getUserDetail(@PathVariable @Min(value = 1 , message = "Userid phải lớn hơn hoặc bằng 1") int userid) {
        UserResponse user = userService.getUserDetail(userid);
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value(), "Lấy dữ liệu thành công" , user));
    }
//    @Operation(summary = "Tạo người dùng")
    @PostMapping("/createUser")
    public ResponseEntity<DataResponse> createUser(@RequestBody @Valid UserCreateRequest user) {
        boolean isSucess = userService.addUser(user);
        if (isSucess) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new DataResponse(HttpStatus.CREATED.value(), "Tạo người dùng thành công" , user));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Tạo người dùng thất bại"));
    }
//    @Operation(summary = "Cập nhật người dùng")
    @PutMapping("/updateUser")
    public ResponseEntity<DataResponse> updateUser(@RequestBody @Valid UserUpdateRequest user) {
        boolean isSuccess = userService.updateUser(user);
        if (isSuccess) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Cập nhật người dùng thành công", user));
        }
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new DataResponse(HttpStatus.CREATED.value(), "Cập nhật người dùng thất bại"));
    }

//    @Operation(summary = "Xóa người dùng")
    @DeleteMapping("/deleteUser/{userid}")
    public ResponseEntity<DataResponse> deleteUser(@PathVariable @Min(value = 1 , message = "Userid phải lớn hơn hoặc bằng 1") int userid) {
        boolean isSuccess = userService.deleteUser(userid);
        if (isSuccess) {
            return ResponseEntity.ok(
                    new DataResponse(HttpStatus.OK.value(), "Xóa người dùng thành công", userid)
            );
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Xóa người dùng thất bại", userid));
    }
    @GetMapping("/confirm-email")
    public ResponseEntity<DataResponse> confirmEmail(@RequestParam String secretcode) {
        EmailVerificationCode email = verificationCodeService.checkCode(secretcode);
        if (email != null) {
            userService.updateStatus(secretcode);
            return ResponseEntity.ok(
                    new DataResponse(HttpStatus.OK.value(), "Xác thực người dùng thành công")
            );
        }
        return ResponseEntity.ok(
                new DataResponse(HttpStatus.UNAUTHORIZED.value(), "Xác thực người dùng thất bại")
        );
    }
}
