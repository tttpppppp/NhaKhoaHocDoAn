package org.cm.springboot.controller;

import org.cm.springboot.controller.response.ChucDanhResponse;
import org.cm.springboot.controller.response.ChuyenNganhResponse;
import org.cm.springboot.model.ChucDanhKhoaHoc;
import org.cm.springboot.payload.DataResponse;
import org.cm.springboot.service.ChuyenNganhService;
import org.cm.springboot.service.impl.ChucDanhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chucdanh")
public class ChucDanhController {
    @Autowired
    private ChucDanhService chucDanhService;
    @GetMapping("/list")
    public ResponseEntity<?> getAllChuyenNganh() {
        List<ChucDanhResponse> chuyenNganhResponses = chucDanhService.getAllChucDanh();
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , chuyenNganhResponses));
    }
    @PostMapping("/create")
    public ResponseEntity<?> cretaeChuyenNganh(@RequestBody ChucDanhResponse chucDanhResponse) {
        boolean isSuccess = chucDanhService.createChucDanh(chucDanhResponse);
        if (isSuccess) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Thêm chức danh thành công" , isSuccess));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Thêm chức danh thất bại"));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteChuyenNganh(@PathVariable int id) {
        boolean isSuccess = chucDanhService.deleteChucDanh(id);
        if (isSuccess) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Xóa chức danh thành công"));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Xóa chức danh thất bại"));
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateChuyenNganh(@RequestBody ChucDanhResponse chucDanhResponse) {
        ChucDanhResponse isSuccess = chucDanhService.updateChucDanh(chucDanhResponse);
        if (isSuccess != null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Cập nhật chức danh thành công" , isSuccess));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Cập nhật chức danh thất bại"));
    }
}
