package org.cm.springboot.controller.resquest;

import lombok.Data;

import java.util.Date;

@Data
public class CreateQTCTRequest {
    private int id;
    private int chucDanhCongTac;
    private int chucVu;
    private int coQuanCongTac;
    private int nhakhoahoc;
    private Date denNam;
    private Date tuNam;
    private boolean status;
}
