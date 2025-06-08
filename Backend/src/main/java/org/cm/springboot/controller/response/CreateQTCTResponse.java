package org.cm.springboot.controller.response;

import lombok.Data;

import java.util.List;

@Data
public class CreateQTCTResponse {
    private List<CoQuanCongTacResponse> coQuanCongTacResponse;
    private List<ChucDanhCongTacResponse> chucDanhCongTacResponse;
    private List<ChucVuResponse> chucVuResponse;
    private List<NhaKhoaHocFormResponse> nhaKhoaHocFormResponse;
}
