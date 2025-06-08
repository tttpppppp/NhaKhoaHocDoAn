package org.cm.springboot.controller.response;


import lombok.Data;

import java.util.List;

@Data
public class NhaKhoaHocPage {
    private int page;
    private int size;
    private int totalPages;
    private long totalElements;
    List<NhaKhoaHocHomeResponse> nhaKhoaHocHomeResponses;

    public NhaKhoaHocPage(int page, int size, int totalPages, long totalElements, List<NhaKhoaHocHomeResponse> nhaKhoaHocHomeResponses) {
        this.page = page;
        this.size = size;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.nhaKhoaHocHomeResponses = nhaKhoaHocHomeResponses;
    }
}
