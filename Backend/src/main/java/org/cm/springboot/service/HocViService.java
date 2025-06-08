package org.cm.springboot.service;

import org.cm.springboot.controller.response.HocViResponse;

import java.util.List;

public interface HocViService {
    List<HocViResponse> getAllHocVi();
    boolean addDonVi(HocViResponse hocViResponse);
    HocViResponse updateDonVi(HocViResponse hocViResponse);
    boolean deleteHocVi(int id);
}
