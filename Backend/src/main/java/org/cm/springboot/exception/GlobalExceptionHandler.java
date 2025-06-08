package org.cm.springboot.exception;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.validation.ConstraintViolationException;
import org.cm.springboot.payload.DataResponse;
import org.cm.springboot.payload.ErrorReponse;
import org.cm.springboot.service.impl.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.context.request.WebRequest;

import java.nio.file.AccessDeniedException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({ResourceNotFoundException.class ,
                        MethodArgumentNotValidException.class ,
                        MissingServletRequestParameterException.class,
                        ConstraintViolationException.class , EmailAlreadyExistsException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Tìm thấy người dùng"),
//            @ApiResponse(responseCode = "404", description = "Không tìm thấy người dùng",
//                    content = @Content(mediaType = "application/json"))
//    })
    public ErrorReponse hadnleResourceNotFoundException(Exception e , WebRequest request) {
        ErrorReponse errorReponse = new ErrorReponse();
        errorReponse.setTimestamp(new Date());
        errorReponse.setStatus(HttpStatus.NOT_FOUND.value());
        errorReponse.setError(HttpStatus.NOT_FOUND.getReasonPhrase());
        errorReponse.setPath(request.getDescription(false).replace("uri=" , ""));
        if(e instanceof ResourceNotFoundException){
            errorReponse.setMessage(e.getMessage());
        }else if(e instanceof MethodArgumentNotValidException ex){
            Map<String, String> errors = new HashMap<>();
            ex.getBindingResult().getFieldErrors().forEach(fieldError -> {
                errors.put(fieldError.getField(), fieldError.getDefaultMessage());
            });
            errorReponse.setMessage(errors);
        }else if(e instanceof ConstraintViolationException ex){
            Map<String, String> violations = new HashMap<>();
            ex.getConstraintViolations().forEach(violation -> {
                violations.put(violation.getPropertyPath().toString().replace("deleteUser." , ""), violation.getMessage());
            });
            errorReponse.setMessage(violations);
        }else if(e instanceof EmailAlreadyExistsException ex){
            errorReponse.setMessage(ex.getMessage());
        }
        return errorReponse;
    }
    @ExceptionHandler({
            BadCredentialsException.class,
            DisabledException.class,
            LockedException.class,
            AuthenticationException.class,
            AccessDeniedException .class,
            TokenExpiredException.class
    })
    public DataResponse handleAuthExceptions(Exception ex, WebRequest request) {
        System.out.println("123456");
        HttpStatus status = HttpStatus.UNAUTHORIZED; // Mặc định 401
        String message;
        if (ex instanceof BadCredentialsException) {
            message = "Email hoặc mật khẩu không chính xác";
        } else if (ex instanceof DisabledException) {
            message = "Tài khoản đã của bạn chưa xác thực";
        } else if (ex instanceof LockedException) {
            message = "Tài khoản đã bị khóa";
        }else if(ex instanceof TokenExpiredException){
            message = "Phiên bản đã hết hạn!";
        }else if(ex instanceof AccessDeniedException ){
            message = "Không có quyền truy câp";
        } else {
            message = "Xác thực thất bại: " + ex.getMessage();
        }
       return new DataResponse(HttpStatus.UNAUTHORIZED.value(), message);
    }
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ErrorReponse> handleExpiredToken(ExpiredJwtException ex, WebRequest request) {
        System.out.println("123456");
        // Tạo error response cho token hết hạn
        ErrorReponse errorResponse = new ErrorReponse();
        errorResponse.setTimestamp(new Date());
        errorResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
        errorResponse.setError("Token hết hạn");
        errorResponse.setMessage(ex.getMessage());
        errorResponse.setPath(request.getDescription(false).replace("uri=", ""));

        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

}
