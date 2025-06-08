package org.cm.springboot.controller.response;

import lombok.Data;

@Data
public class ChucDanhResponse {
    private int chucDanhId;
    private String tenChucDanh;
    private String mota;
    private boolean status;
}
