package org.cm.springboot.controller.response;

import lombok.Data;

@Data
public class HocViResponse {
    private int hocViId;
    private String tenHocVi;
    private String mota;
    private boolean status;
}
