package org.cm.springboot.controller.response;

import lombok.Data;

@Data
public class BaiBaoChiTietResponse {
    private String tenBaiBao;
    private TapChiResponse tapChiResponse;
    private String tenLinhVuc;
    private String tenTacGia;
    private String lienket;
}
