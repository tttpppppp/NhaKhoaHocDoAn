package org.cm.springboot.controller.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
public class QuaTrinhCongTacResponse {
    private int id;
    private String fullname;
    private String chuyenNganh;
    private String tuNam;
    private String denNam;
    private String chucDanhCongTac;
    private String coQuanCongTac;
    private String chucVu;
    private boolean status;
}
