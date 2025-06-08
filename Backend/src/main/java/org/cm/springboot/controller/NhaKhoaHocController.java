package org.cm.springboot.controller;

import org.cm.springboot.controller.response.HocViResponse;
import org.cm.springboot.controller.response.NhaKhoaHocPage;
import org.cm.springboot.controller.response.NhaKhoaHocResponse;
import org.cm.springboot.controller.resquest.CreateNhaKhoaHocRequest;
import org.cm.springboot.controller.resquest.EditRequestNhaKhoaHoc;
import org.cm.springboot.payload.DataResponse;
import org.cm.springboot.service.FilterService;
import org.cm.springboot.service.NhaKhoaHocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/scientist")
public class NhaKhoaHocController {
    @Autowired
    NhaKhoaHocService nhaKhoaHocService;
    @Autowired
    FilterService filterService;
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('USER' , 'ADMIN' , 'MANAGER')")
    public ResponseEntity<?> get(@PathVariable("id") int id) {
        NhaKhoaHocResponse nhaKhoaHocResponse= nhaKhoaHocService.getDetailNhaKhoaHoc(id);
        if(nhaKhoaHocResponse != null) {
            return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , nhaKhoaHocResponse));
        }
        return ResponseEntity.ok(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value() , "Lấy dữ liệu thất bại"));
    }
    @GetMapping("/list")
    public ResponseEntity<?> getHomeNhaKhoaHoc(@RequestParam(required = false) String keyword,
                                               @RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "12") int size ,
                                               @RequestParam(defaultValue = "-1") int donvi,
                                               @RequestParam(defaultValue = "-1") int ngach,
                                               @RequestParam(defaultValue = "-1") int chucdanh,
                                               @RequestParam(defaultValue = "-1") int hocvi,
                                               @RequestParam(defaultValue = "-1") int linhvucnghiencuu
                                               ) {
        NhaKhoaHocPage  nhaKhoaHocPage = nhaKhoaHocService.getAllNhaKhoaHoc(keyword, page, size , donvi , ngach ,  chucdanh,   hocvi ,  linhvucnghiencuu);
        if(nhaKhoaHocPage.getTotalElements() != 0) {
             return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , nhaKhoaHocPage));
        }
        return ResponseEntity.ok(new DataResponse(HttpStatus.NOT_FOUND.value() , "Lấy dữ liệu thất bại"));
    }
    @GetMapping("/filter")
    public ResponseEntity<?> getFilter() {
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , filterService.getFilter()));

    }

    @GetMapping("/admin/list")
    public ResponseEntity<?> getAllNhaKhoaHocAdmin(@RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "12") int size) {
        NhaKhoaHocPage  nhaKhoaHocPage = nhaKhoaHocService.getAllNhaKhoaHocAdmin(page, size);
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" ,nhaKhoaHocPage));
    }
    @GetMapping("/form/list")
    public ResponseEntity<?> getDataForm() {
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , filterService.createNhaKhoaHocForm()));

    }
    @PostMapping("/create")
    public ResponseEntity<?> createNhaKhoaHoc(@RequestBody CreateNhaKhoaHocRequest createNhaKhoaHocRequest) {
        boolean isSuccess = nhaKhoaHocService.createNhaKhoaHoc(createNhaKhoaHocRequest);
        if (isSuccess) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Thêm nhà khoa học thành công" , isSuccess));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Thêm nhà khoa học thất bại"));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteNhaKhoaHoc(@PathVariable int id) {
        boolean isSuccess = nhaKhoaHocService.deleteNhaKhoaHoc(id);
        if (isSuccess) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Xóa nhà khoa học thành công"));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Xóa nhà khoc học thất bại"));
    }
    @GetMapping("/form/detail/{id}")
    public ResponseEntity<?> getFormDetail(@PathVariable int id) {
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , nhaKhoaHocService.getDetailNhaKhoaHocFormDetail(id)));
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateNhaKhoaHoc(@RequestBody EditRequestNhaKhoaHoc editRequestNhaKhoaHoc) {
        EditRequestNhaKhoaHoc updated = nhaKhoaHocService.editNhakHoaHoc(editRequestNhaKhoaHoc);
        if (updated != null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new DataResponse(HttpStatus.OK.value(), "Cập nhật nhà khoa học thành công", updated));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Cập nhật nhà khoa học thất bại"));
    }

}
