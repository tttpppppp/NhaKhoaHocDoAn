package org.cm.springboot.service;


import org.cm.springboot.controller.response.BaiBaoChiTietResponse;
import org.cm.springboot.controller.response.BaiBaoCreateForm;
import org.cm.springboot.controller.response.BaiBaoPage;
import org.cm.springboot.controller.response.BaiBaoResponse;
import org.cm.springboot.controller.resquest.CreateRequestBaiBao;

import java.util.List;

public interface BaiBaoService {
    BaiBaoPage getAllBaiBao(int page, int size, String tuKhoa, int capTapChi, int donVi, int linhVuc,
                                   int loaiTapChi, int tacGia, String tuThoiDiem, String denThoiDiem, int phanLoaiTapChi);
    BaiBaoChiTietResponse getBaiBaoChiTiet(int id);

    List<BaiBaoResponse> getAllBaiBaoAdmin();

    BaiBaoCreateForm getBaiBaoCreateForm();

    boolean createBaiBao(CreateRequestBaiBao createRequestBaiBao);
}

