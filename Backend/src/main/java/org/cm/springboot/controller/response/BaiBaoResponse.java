package org.cm.springboot.controller.response;

import lombok.Data;

@Data
public class BaiBaoResponse {
    private int id;
    private String tenBaiBao;
    private String tenTapChi;
    private String tenLinhVuc;
    private String tenCapTapChi;
    private String tenTacGia;
    private String lienket;
    private String issn;
    private boolean status;
}
