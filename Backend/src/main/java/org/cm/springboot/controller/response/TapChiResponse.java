package org.cm.springboot.controller.response;

import lombok.Data;

@Data
public class TapChiResponse {
    private int id;
    private String issn;
    private String tenTapChi;
    private String tenCapTapChi;
    private String tenCoQuanXuatBan;
    private String tenLoaiTapChi;
    private String tenPhanLoai;
    private int nam;
    private String tap;
    private String so;
    private String trang;
}
