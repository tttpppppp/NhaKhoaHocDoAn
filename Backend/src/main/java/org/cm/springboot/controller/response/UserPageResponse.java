package org.cm.springboot.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class UserPageResponse {
    private int page;
    private int size;
    private int totalPages;
    private long totalElements;
    List<UserResponse> users;

    public UserPageResponse(int page, int size, int totalPages, long totalElements, List<UserResponse> users) {
        this.page = page;
        this.size = size;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.users = users;
    }

}
