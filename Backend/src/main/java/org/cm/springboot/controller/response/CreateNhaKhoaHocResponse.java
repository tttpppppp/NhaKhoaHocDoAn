package org.cm.springboot.controller.response;

import lombok.Data;

import java.util.List;

@Data
public class CreateNhaKhoaHocResponse {
    List<DonViResponse> donViResponses;
    List<NgachResponse> ngachRespionses;
    List<ChucDanhResponse> chucDanhResponses;
    List<HocViResponse> hocViResponses;
    List<ChuyenNganhResponse> chuyenNganhResponses;
    List<NganhDaoTaoResponse> nganhDaoTaoResponses;
    List<LinhVucNghienCuuResponse> linhVucNghienCuuResponses;
}
