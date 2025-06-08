package org.cm.springboot.controller.response;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class NhaKhoaHocResponse {
    private String fullname;
    private String image;
    private String chucdanh;
    private String gioiTinh;
    private String namSinh;
    private String address;
    private String dienThoai;
    private String email;
    private String nganhDaoTao;
    private String chuyenNganh;
    private String chuyenMonGiangDay;
    private List<LinhVucNghienCuuResponse> linhVucNghienCuuResponses;
    private String ngoaiNgu;
    private int soLuongBaiBao;
    private DonViResponse donViResponse;
    private List<QuaTrinhCongTacResponse> quaTrinhCongTacResponses;
    private List<QuaTrinhDaoTaoResponse> quaTrinhDaoTaoResponses;
}
