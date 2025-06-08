package org.cm.springboot.controller.resquest;

import lombok.Data;

@Data
public class CreateRequestBaiBao {
    private int idLinhVuc;
    private int idTacGia;
    private int idTapChi;
    private int idDonVi;
    private String issn;
    private String lienket;
    private String tenBaiBao;
}