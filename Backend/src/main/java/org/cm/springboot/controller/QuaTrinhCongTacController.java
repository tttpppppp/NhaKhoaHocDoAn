package org.cm.springboot.controller;

import org.cm.springboot.controller.response.CreateQTCTResponse;
import org.cm.springboot.controller.response.HocViResponse;
import org.cm.springboot.controller.response.QuaTrinhCongTacResponse;
import org.cm.springboot.controller.resquest.ChuyenNganhResquest;
import org.cm.springboot.controller.resquest.CreateQTCTRequest;
import org.cm.springboot.payload.DataResponse;
import org.cm.springboot.service.FilterService;
import org.cm.springboot.service.QuaTrinhCongTacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quatrinhcongtac")
public class QuaTrinhCongTacController {
    @Autowired
    QuaTrinhCongTacService quaTrinhCongTacService;
    @Autowired
    FilterService filterService;

    @GetMapping("/list/form")
    public ResponseEntity<?> getAllQuaTrinhCongTac() {
        CreateQTCTResponse createQTCTResponse = filterService.createQuaTrinhDaoTaoForm();
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , createQTCTResponse));
    }
    @GetMapping("/list")
    public ResponseEntity<?> getAllDataFormCreate() {
        List<QuaTrinhCongTacResponse> quatrinhcongtac = quaTrinhCongTacService.getAllQuaTrinhCongTac();
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , quatrinhcongtac));
    }
    @PostMapping("/add")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> addQuaTrinhCongTac(@RequestBody CreateQTCTRequest request) {
        boolean isSuccess = quaTrinhCongTacService.createQuaTrinhCongTac(request);
        if(isSuccess){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new DataResponse(HttpStatus.CREATED.value(), "Tạo quá trình công tác thành công"));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Tạo quá trình công tácthất bại"));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteQTCT(@PathVariable int id) {
        boolean isSuccess = quaTrinhCongTacService.deleteQuaTrinhCongTac(id);
        if (isSuccess) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Xóa quá trình công tác thành công"));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Xóa quá trình công tác thất bại"));
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateHocVi(@RequestBody CreateQTCTRequest request) {
        CreateQTCTRequest isSuccess = quaTrinhCongTacService.updateQTCT(request);
        if (isSuccess != null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Cập nhật quá trình công tác thành công" , isSuccess));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Cập nhật quá trình công tác thất bại"));
    }
    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getQTCTDetail(@PathVariable int id) {
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , quaTrinhCongTacService.getQTCT(id)));
    }
}
