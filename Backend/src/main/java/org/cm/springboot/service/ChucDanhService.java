package org.cm.springboot.service;

import org.cm.springboot.controller.response.ChucDanhResponse;
import org.cm.springboot.model.ChucDanhKhoaHoc;

import java.util.List;

public interface ChucDanhService {
    List<ChucDanhResponse> getAllChucDanh();
    boolean deleteChucDanh(int id);
    ChucDanhResponse updateChucDanh(ChucDanhResponse chucDanhResponse);
    boolean createChucDanh(ChucDanhResponse chucDanhResponse);
}
