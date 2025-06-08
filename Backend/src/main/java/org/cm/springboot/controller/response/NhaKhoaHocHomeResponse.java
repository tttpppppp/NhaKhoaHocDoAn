package org.cm.springboot.controller.response;

import lombok.Data;

@Data
public class NhaKhoaHocHomeResponse {
    private long id;
    private String fullname;
    private String chucdanh;
    private String nganhDaoTao;
    private String chuyenNganh;
    private String tenDonVi;
    private String image;
    private boolean status;
}
