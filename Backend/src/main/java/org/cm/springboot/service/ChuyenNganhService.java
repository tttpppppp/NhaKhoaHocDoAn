package org.cm.springboot.service;

import org.cm.springboot.controller.response.ChuyenNganhResponse;
import org.cm.springboot.controller.resquest.ChuyenNganhResquest;

import java.util.List;

public interface ChuyenNganhService {
    List<ChuyenNganhResponse> getAllChuyenNganh();
    boolean addChuyenNganh(ChuyenNganhResquest chuyenNganh);
    boolean deleteChuyenNganh(long id);
    ChuyenNganhResponse updateChuyenNganh(ChuyenNganhResponse chuyenNganhResponse);
}
