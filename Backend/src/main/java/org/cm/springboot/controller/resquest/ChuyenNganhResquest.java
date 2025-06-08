package org.cm.springboot.controller.resquest;

import lombok.Data;

@Data
public class ChuyenNganhResquest {
    private long id;
    private String tenChuyenNganh;
    private String mota;
    private boolean status;
}
