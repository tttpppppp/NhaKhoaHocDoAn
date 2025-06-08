package org.cm.springboot.controller.response;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class DonViResponse {
    private int donViId;
    private String tenDonVi;
    private String dienthoai;
    private String diachi;
    private String email;
    private boolean status;
}
