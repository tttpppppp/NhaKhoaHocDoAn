package org.cm.springboot.service;


import org.cm.springboot.controller.response.CreateNhaKhoaHocResponse;
import org.cm.springboot.controller.response.CreateQTCTResponse;
import org.cm.springboot.controller.response.FilterBaiBaoResponse;
import org.cm.springboot.controller.response.FilterResponse;

public interface FilterService {
    FilterResponse getFilter();
    CreateNhaKhoaHocResponse createNhaKhoaHocForm();
    CreateQTCTResponse createQuaTrinhDaoTaoForm();
    FilterBaiBaoResponse getFilterBaiBao();
}
