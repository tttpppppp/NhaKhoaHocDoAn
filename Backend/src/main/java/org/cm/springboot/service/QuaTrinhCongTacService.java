package org.cm.springboot.service;

import org.cm.springboot.controller.response.QuaTrinhCongTacResponse;
import org.cm.springboot.controller.resquest.CreateQTCTRequest;

import java.util.List;

public interface QuaTrinhCongTacService {
    List<QuaTrinhCongTacResponse> getAllQuaTrinhCongTac();
    boolean createQuaTrinhCongTac(CreateQTCTRequest request);
    boolean deleteQuaTrinhCongTac(int id);
    CreateQTCTRequest updateQTCT(CreateQTCTRequest response);
    CreateQTCTRequest getQTCT(int id);
}
