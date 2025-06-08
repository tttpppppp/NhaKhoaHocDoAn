package org.cm.springboot.controller.response;

import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
public class FilterResponse {
    List<DonViResponse> donViResponses;
    List<NgachResponse> ngachRespionses;
    List<ChucDanhResponse> chucDanhResponses;
    List<HocViResponse> hocViResponses;
    List<LinhVucNghienCuuResponse> linhVucNghienCuuResponses;
}
