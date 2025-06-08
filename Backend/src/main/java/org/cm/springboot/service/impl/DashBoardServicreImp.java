package org.cm.springboot.service.impl;

import org.cm.springboot.controller.response.NhaKhoaHocResponse;
import org.cm.springboot.controller.response.ResponseDashboard;
import org.cm.springboot.repository.BaiBaoRepository;
import org.cm.springboot.repository.NhaKhoaHocRepository;
import org.cm.springboot.repository.UserRepository;
import org.cm.springboot.service.DashBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashBoardServicreImp implements DashBoardService {
    @Autowired
    NhaKhoaHocRepository NhaKhoaHocRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BaiBaoRepository baiBaoRepository;
    @Override
    public ResponseDashboard getDashboard() {
        ResponseDashboard dashboard = new ResponseDashboard();
        dashboard.setTotalUsers(userRepository.findAll().size());
        dashboard.setTotalScients(NhaKhoaHocRepository.findAll().size());
        dashboard.setTotalArticles(baiBaoRepository.findAll().size());
        return dashboard;
    }
}
