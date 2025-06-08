package org.cm.springboot.service;

import org.cm.springboot.controller.response.UserPageResponse;
import org.cm.springboot.controller.response.UserResponse;
import org.cm.springboot.controller.resquest.UserCreateRequest;
import org.cm.springboot.controller.resquest.UserUpdateRequest;

public interface UserService {
    UserPageResponse getAllUsers(String keyword, int page, int size);

    UserResponse getUserDetail(int id);

    boolean addUser(UserCreateRequest user);

    boolean updateUser(UserUpdateRequest user);

    void updateStatus(String code);

    boolean deleteUser(int id);
}
