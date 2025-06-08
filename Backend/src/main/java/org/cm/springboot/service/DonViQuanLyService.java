package org.cm.springboot.service;


import org.cm.springboot.controller.response.DonViResponse;

import java.util.List;

public interface DonViQuanLyService {
    List<DonViResponse> getAllDonVi();
    boolean addDonVi(DonViResponse donViResponse);
    DonViResponse updateDonVi(DonViResponse donViResponse);
    boolean deleteDonVi(int id);
}
