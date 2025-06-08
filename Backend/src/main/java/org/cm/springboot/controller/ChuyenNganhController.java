package org.cm.springboot.controller;

import lombok.extern.slf4j.Slf4j;
import org.cm.springboot.controller.response.ChucDanhResponse;
import org.cm.springboot.controller.response.ChuyenNganhResponse;
import org.cm.springboot.controller.resquest.ChuyenNganhResquest;
import org.cm.springboot.payload.DataResponse;
import org.cm.springboot.service.ChuyenNganhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/chuyennganh")
public class ChuyenNganhController {
    @Autowired
    ChuyenNganhService chuyenNganhService;
    @GetMapping("/list")
    public ResponseEntity<?> getAllChuyenNganh() {
        List<ChuyenNganhResponse> chuyenNganhResponses = chuyenNganhService.getAllChuyenNganh();
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , chuyenNganhResponses));
    }
    @PostMapping("/add")
    public ResponseEntity<?> addChuyenNganh(@RequestBody ChuyenNganhResquest chuyenNganhResquest) {
        boolean isSuccess = chuyenNganhService.addChuyenNganh(chuyenNganhResquest);
        if(isSuccess){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new DataResponse(HttpStatus.CREATED.value(), "Tạo chuyên ngành thành công"));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Tạo chuyên ngành thất bại"));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteChuyenNganh(@PathVariable long id) {
        log.info("Deleting chuyen nganh");
        boolean isSuccess = chuyenNganhService.deleteChuyenNganh(id);
        if (isSuccess) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Xóa chuyên ngành thành công"));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Xóa chuyên ngành thất bại"));
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateChuyenNganh(@RequestBody ChuyenNganhResponse chuyenNganhResponse) {
        ChuyenNganhResponse isSuccess = chuyenNganhService.updateChuyenNganh(chuyenNganhResponse);
        if (isSuccess != null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Cập nhật chức danh thành công" , isSuccess));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Cập nhật chức danh thất bại"));
    }
}
