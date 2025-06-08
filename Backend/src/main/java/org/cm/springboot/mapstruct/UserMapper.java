package org.cm.springboot.mapstruct;

import org.cm.springboot.controller.response.UserResponse;
import org.cm.springboot.model.Users;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toUsers(Users users);
}
