package org.cm.springboot.controller.response;

import lombok.Data;

import java.util.List;

@Data
public class BaiBaoPage {
    private int page;
    private int size;
    private int totalPages;
    private long totalElements;
    List<BaiBaoResponse> baiBaoResponses;

    public BaiBaoPage(int page, int size , int totalPages , long totalElements, List<BaiBaoResponse> baiBaoResponses) {
        this.page = page;
        this.baiBaoResponses = baiBaoResponses;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.size = size;
    }
}
