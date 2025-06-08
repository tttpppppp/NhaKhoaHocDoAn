package org.cm.springboot.controller;

import org.cm.springboot.controller.response.DonViResponse;
import org.cm.springboot.payload.DataResponse;
import org.cm.springboot.service.DonViQuanLyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donviquanly")
public class DonViQuanLyController {
    @Autowired
    DonViQuanLyService donViQuanLyService;

    @GetMapping("/list")
    public ResponseEntity<?> getAllDonViQuanLy() {
        List<DonViResponse> donvi = donViQuanLyService.getAllDonVi();
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , donvi));
    }
    @PostMapping("/add")
    public ResponseEntity<?> addDonVi(@RequestBody DonViResponse donViResponse) {
        boolean isSuccess = donViQuanLyService.addDonVi(donViResponse);
        if(isSuccess){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new DataResponse(HttpStatus.CREATED.value(), "Tạo đơn vị thành công"));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Tạo đơn vị thất bại"));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteChuyenNganh(@PathVariable int id) {
        boolean isSuccess = donViQuanLyService.deleteDonVi(id);
        if (isSuccess) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Xóa đơn vị thành công"));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Xóa đoơn vị thất bại"));
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateChuyenNganh(@RequestBody DonViResponse donViResponse) {
        DonViResponse isSuccess = donViQuanLyService.updateDonVi(donViResponse);
        if (isSuccess != null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Cập nhật đơn vị thành công" , isSuccess));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Cập nhật đơn vị thất bại"));
    }
}
