package org.cm.springboot.controller.response;

import lombok.Data;

import java.util.List;

@Data
public class NhaKhoaHocPageResponse {
    private int page;
    private int size;
    private int totalPages;
    private long totalElements;
    List<NhaKhoaHocResponse> users;
}
