package org.cm.springboot.controller;

import org.cm.springboot.controller.response.HocViResponse;
import org.cm.springboot.payload.DataResponse;
import org.cm.springboot.service.HocViService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hocvi")
public class HocViController {
    @Autowired
    HocViService hocViService;

    @GetMapping("/list")
    public ResponseEntity<?> getAllChuyenNganh() {
        List<HocViResponse> hocviResponses = hocViService.getAllHocVi();
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , hocviResponses));
    }
    @PostMapping("/add")
    public ResponseEntity<?> addHocVi(@RequestBody HocViResponse hocViResponse) {
        boolean isSuccess = hocViService.addDonVi(hocViResponse);
        if(isSuccess){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new DataResponse(HttpStatus.CREATED.value(), "Tạo học vị thành công"));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Tạo học vị  thất bại"));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteHocVi(@PathVariable int id) {
        boolean isSuccess = hocViService.deleteHocVi(id);
        if (isSuccess) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Xóa học vị  thành công"));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Xóa học vị thất bại"));
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateHocVi(@RequestBody HocViResponse hocViResponse) {
        HocViResponse isSuccess = hocViService.updateDonVi(hocViResponse);
        if (isSuccess != null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Cập nhật học vị  thành công" , isSuccess));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Cập nhật học vị  thất bại"));
    }
}
