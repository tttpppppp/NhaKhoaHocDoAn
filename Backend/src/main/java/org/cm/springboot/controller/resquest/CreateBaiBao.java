package org.cm.springboot.controller.resquest;

import lombok.Data;

@Data
public class CreateBaiBao {
    private int id;
    private String tenBaiBao;
    private String lienket;
    private boolean status;
    private int nhaKhoaHocId;
    private int tapChiId;
    private int donviId;
    private int linhvucnghiencuu;
}
