package org.cm.springboot.controller.response;

import lombok.Data;

import java.util.List;

@Data
public class FilterBaiBaoResponse {
    private List<DonViResponse> donViResponse;
    private List<LoaiTapChiResponse> loaiTapChiResponse;
    private List<PhanLoaiTapChiResponse> phanLoaiTapChiResponse;
    private List<CapTapChiResponse> capTapChiResponse;
    private List<LinhVucNghienCuuResponse> linhVucNghienCuuResponse;
    private List<NhaKhoaHocFormResponse> nhaKhoaHocFormResponse;
}
