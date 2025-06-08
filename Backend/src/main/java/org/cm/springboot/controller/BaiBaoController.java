package org.cm.springboot.controller;

import org.cm.springboot.controller.response.*;
import org.cm.springboot.controller.resquest.CreateRequestBaiBao;
import org.cm.springboot.payload.DataResponse;
import org.cm.springboot.service.BaiBaoService;
import org.cm.springboot.service.FilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/baibao")
public class BaiBaoController {
    @Autowired
    private BaiBaoService baiBaoService;

    @Autowired
    FilterService filterService;

    @GetMapping("/list")
    public ResponseEntity<?> getAllBaiBao(@RequestParam(required = false) String tuKhoa,
                                          @RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "12") int size ,
                                          @RequestParam(defaultValue = "-1") int capTapChi,
                                          @RequestParam(defaultValue = "-1") int donvi,
                                          @RequestParam(defaultValue = "-1") int linhVuc,
                                          @RequestParam(defaultValue = "-1") int loaiTapChi,
                                          @RequestParam(defaultValue = "-1") int tacGia,
                                          @RequestParam(required = false) String tuThoiDiem,
                                          @RequestParam(required = false) String denThoiDiem,
                                          @RequestParam(defaultValue = "-1") int phanLoaiTapChi) {
        BaiBaoPage baiBaos = baiBaoService.getAllBaiBao(page, size, tuKhoa, capTapChi, donvi, linhVuc,
                loaiTapChi, tacGia, tuThoiDiem, denThoiDiem, phanLoaiTapChi);
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , baiBaos));
    }
    @GetMapping("/admin/list")
    public ResponseEntity<?> getAllBaiBaoAdmin(){
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , baiBaoService.getAllBaiBaoAdmin()));
    }
    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getDetailBaiBao(@PathVariable Integer id) {
        BaiBaoChiTietResponse baiBaoChiTietResponse = baiBaoService.getBaiBaoChiTiet(id);
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value(), "Lấy dữ liệu thành công", baiBaoChiTietResponse));
    }


    @GetMapping("/list/filter")
    public ResponseEntity<?> getFilterBaiBao() {
        FilterBaiBaoResponse filterBaiBaoResponse = filterService.getFilterBaiBao();
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , filterBaiBaoResponse));
    }


    @GetMapping("/admin/form")
    public ResponseEntity<?> getFormBaiBao() {
        BaiBaoCreateForm filterBaiBaoResponse = baiBaoService.getBaiBaoCreateForm();
        return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Lấy dữ liệu thành công" , filterBaiBaoResponse));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBaiBao(@RequestBody CreateRequestBaiBao createRequestBaiBao) {
        boolean isSucess = baiBaoService.createBaiBao(createRequestBaiBao);
        if(isSucess){
            return ResponseEntity.ok(new DataResponse(HttpStatus.OK.value() , "Thêm bài báo thành công"));
        }
        return ResponseEntity.ok(new DataResponse(HttpStatus.INTERNAL_SERVER_ERROR.value() , "Thêm bài báo thất bại"));
    }
}
