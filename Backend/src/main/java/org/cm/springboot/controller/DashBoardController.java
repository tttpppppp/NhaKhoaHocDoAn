package org.cm.springboot.controller;


import org.cm.springboot.controller.response.HocViResponse;
import org.cm.springboot.controller.response.ResponseDashboard;
import org.cm.springboot.payload.DataResponse;
import org.cm.springboot.service.DashBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashBoardController {
    @Autowired
    DashBoardService dashBoardService;
    @GetMapping("/list")
    public ResponseEntity<?> getDashBoard() {
        ResponseDashboard responseDashboard = dashBoardService.getDashboard();
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , responseDashboard));
    }
}
