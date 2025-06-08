package org.cm.springboot.controller.response;

import lombok.Data;

import java.util.List;

@Data
public class BaiBaoCreateForm {
    private List<TapChiResponse> tapChiResponses;
    private List<LinhVucNghienCuuResponse> linhVucNghienCuuResponses;
    private List<NhaKhoaHocFormResponse> nhaKhoaHocFormResponses;
    private List<DonViResponse> donViResponses;
}
