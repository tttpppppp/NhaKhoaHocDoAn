package org.cm.springboot.controller.response;

import lombok.Data;

@Data
public class ChuyenNganhResponse {
    private long id;
    private String tenChuyenNganh;
    private String mota;
    private boolean status;
}
