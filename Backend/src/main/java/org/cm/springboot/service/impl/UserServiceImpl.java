package org.cm.springboot.service.impl;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.cm.springboot.common.UserStatus;
import org.cm.springboot.controller.response.RoleResponse;
import org.cm.springboot.controller.response.UserPageResponse;
import org.cm.springboot.controller.response.UserResponse;
import org.cm.springboot.controller.resquest.UserCreateRequest;
import org.cm.springboot.controller.resquest.UserUpdateRequest;
import org.cm.springboot.exception.EmailAlreadyExistsException;
import org.cm.springboot.exception.ResourceNotFoundException;
import org.cm.springboot.model.EmailVerificationCode;
import org.cm.springboot.model.Role;
import org.cm.springboot.model.UserHasRole;
import org.cm.springboot.model.Users;
import org.cm.springboot.repository.UserHasRoleRepository;
import org.cm.springboot.repository.UserRepository;
import org.cm.springboot.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j(topic = "USER-SERVICE")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VerificationCodeImpl verificationCodeImpl;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserHasRoleRepository userHasRoleRepository;

    Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public UserPageResponse getAllUsers(String keyword , int page, int size) {
        logger.info("Get all user");
        int pageNo = 0;
        if(page > 0) {
            pageNo = page - 1;
        }
        Pageable listUserEntity = PageRequest.of(pageNo , size);
        if(StringUtils.hasLength(keyword)) {
            keyword = keyword.toLowerCase();
            Page<Users> userspage = userRepository.searchByKeyword(keyword , listUserEntity);
            return getUserPageResponse(page, size, userspage);
        }
        Page<Users> users = userRepository.findAll(listUserEntity);
        logger.info("Done get all user");
        return getUserPageResponse(page, size, users);
    }

    private UserPageResponse getUserPageResponse(int page, int size, Page<Users> users) {
        List<UserResponse> userResponses = new ArrayList<>();
        for (Users user : users) {
            UserResponse userResponse = new UserResponse();
            userResponse.setUserId(user.getUserId());
            userResponse.setEmail(user.getEmail());
            userResponse.setFullname(user.getFullname());
            userResponse.setMobile(user.getMobile());
            List<RoleResponse> roles = new ArrayList<>();
            for(var item : user.getUserHasRole()){
                RoleResponse roleResponse = new RoleResponse();
                roleResponse.setId(item.getRole().getRole_id());
                roleResponse.setName(item.getRole().getRolename());
                roleResponse.setDescription(item.getRole().getDescription());
                roles.add(roleResponse);
            }
            userResponse.setRole(roles);
            userResponses.add(userResponse);
        }
        return new UserPageResponse(page, size, users.getTotalPages() , users.getTotalElements() , userResponses);
    }

    public Users getUserById(int id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại!"));
    }

    @Override
    public UserResponse getUserDetail(int id) {
//        logger.info("Get user details: {}", id);
//        Users users = getUserById(id);
//        UserResponse userResponse = userMapper.toUsers(users);
        return null;
    }

    @Transactional
    @Override
    public boolean addUser(UserCreateRequest user) {
           logger.info("Saving user: {}", user);
           Users users = new Users();
           Role role = new Role();
           role.setRole_id(2);
           UserHasRole userHasRole = new UserHasRole();
           Users u = userRepository.findByEmail(user.getEmail());
           if(u != null) {
               throw new EmailAlreadyExistsException("Email đã tồn tại");
           }
           users.setEmail(user.getEmail());
           users.setFullname(user.getFullname());
           users.setMobile(user.getMobile());
           users.setPassword(passwordEncoder.encode(user.getPassword()));
           users.setStatus(UserStatus.ACTIVE);
           userRepository.save(users);
           userHasRole.setRole(role);
           userHasRole.setUser(users);
           userHasRoleRepository.save(userHasRole);
           logger.info("Saved user: {}", user);
           return true;
    }
    @Override
    public boolean updateUser(UserUpdateRequest req) {
        try{
            logger.info("Updating user: {}", req);
            Users user = getUserById(req.getUser_id());
            user.setFullname(req.getFullname());
            user.setMobile(req.getMobile());
            user.setEmail(req.getEmail());
            userRepository.save(user);
            logger.info("Updated user: {}", user);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public void updateStatus(String code) {
        EmailVerificationCode email = verificationCodeImpl.checkCode(code);
        Users user = getUserById(email.getUser_id());
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);
    }

    @Override
    public boolean deleteUser(int id) {
        logger.info("Deleting user: {}", id);
        Users user = getUserById(id);
        user.setStatus(UserStatus.INACTIVE);
        userRepository.save(user);
        logger.info("Deleted user: {}", user);
        return true;

    }
}
