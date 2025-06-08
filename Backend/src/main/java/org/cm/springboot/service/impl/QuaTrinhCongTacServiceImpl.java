package org.cm.springboot.service.impl;

import org.cm.springboot.controller.response.QuaTrinhCongTacResponse;
import org.cm.springboot.controller.resquest.CreateQTCTRequest;
import org.cm.springboot.exception.ResourceNotFoundException;
import org.cm.springboot.model.*;
import org.cm.springboot.repository.CoQuanCongTacRepository;
import org.cm.springboot.repository.QuaTrinhCongTacRepository;
import org.cm.springboot.service.FilterService;
import org.cm.springboot.service.QuaTrinhCongTacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuaTrinhCongTacServiceImpl implements QuaTrinhCongTacService {
    @Autowired
    QuaTrinhCongTacRepository quaTrinhCongTacRepository;
    @Autowired
    private CoQuanCongTacRepository coQuanCongTacRepository;

    public QuaTrinhCongTac getQTCTById(int id) {
        return quaTrinhCongTacRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Qúa trình công tác không tồn tại!"));
    }
    @Override
    public List<QuaTrinhCongTacResponse> getAllQuaTrinhCongTac() {
        List<QuaTrinhCongTacResponse> quaTrinhCongTacResponses = new ArrayList<QuaTrinhCongTacResponse>();
        List<QuaTrinhCongTac> quaTrinhCongTacList = quaTrinhCongTacRepository.findAll();
        for(var item : quaTrinhCongTacList){
            QuaTrinhCongTacResponse quaTrinhCongTacResponse = new QuaTrinhCongTacResponse();
            quaTrinhCongTacResponse.setId(item.getId());
            quaTrinhCongTacResponse.setChucDanhCongTac(item.getChucDanhCongTac().getTen());
            quaTrinhCongTacResponse.setCoQuanCongTac(item.getCoQuanCongTac().getTen());
            quaTrinhCongTacResponse.setChucVu(item.getChucVu().getTenChucVu());
            SimpleDateFormat s = new SimpleDateFormat("dd/MM/yyyy");
            String formatTuNam = s.format(item.getTuNam());
            String formatdenNam = s.format(item.getDenNam());
            quaTrinhCongTacResponse.setTuNam(formatTuNam);
            quaTrinhCongTacResponse.setDenNam(formatdenNam);
            quaTrinhCongTacResponse.setStatus(item.isStatus());
            quaTrinhCongTacResponse.setFullname(item.getNhaKhoaHoc().getFullName());
            quaTrinhCongTacResponse.setChuyenNganh(item.getNhaKhoaHoc().getChuyenNganh().getTenChuyenNganh());
            quaTrinhCongTacResponses.add(quaTrinhCongTacResponse);
        }
        return quaTrinhCongTacResponses;
    }

    @Override
    public boolean createQuaTrinhCongTac(CreateQTCTRequest request) {
      try{
          QuaTrinhCongTac quaTrinhCongTac = new QuaTrinhCongTac();
          CoQuanCongTac coQuanCongTac = new CoQuanCongTac();
          coQuanCongTac.setId(request.getCoQuanCongTac());
          ChucDanhCongTac chucDanhCongTac = new ChucDanhCongTac();
          chucDanhCongTac.setId(request.getChucDanhCongTac());
          ChucVu chucVu = new ChucVu();
          chucVu.setChucVuId(request.getChucVu());
          NhaKhoaHoc nhaKhoaHoc = new NhaKhoaHoc();
          nhaKhoaHoc.setNhaKhoaHocId(request.getNhakhoahoc());
          quaTrinhCongTac.setTuNam(request.getTuNam());
          quaTrinhCongTac.setDenNam(request.getDenNam());
          quaTrinhCongTac.setCoQuanCongTac(coQuanCongTac);
          quaTrinhCongTac.setChucVu(chucVu);
          quaTrinhCongTac.setNhaKhoaHoc(nhaKhoaHoc);
          quaTrinhCongTac.setChucDanhCongTac(chucDanhCongTac);
          quaTrinhCongTacRepository.save(quaTrinhCongTac);
          return true;
      }catch (Exception e){
          return false;
      }
    }

    @Override
    public boolean deleteQuaTrinhCongTac(int id) {
        QuaTrinhCongTac quaTrinhCongTac = getQTCTById(id);
        quaTrinhCongTac.setStatus(false);
        quaTrinhCongTacRepository.save(quaTrinhCongTac);
        return true;
    }

    @Override
    public CreateQTCTRequest updateQTCT(CreateQTCTRequest response) {
        QuaTrinhCongTac qtct = quaTrinhCongTacRepository.findById(response.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Qúa trình công tác không tồn tại!"));

        CoQuanCongTac coQuan = new CoQuanCongTac();
        coQuan.setId(response.getCoQuanCongTac());
        qtct.setCoQuanCongTac(coQuan);

        ChucDanhCongTac chucDanh = new ChucDanhCongTac();
        chucDanh.setId(response.getChucDanhCongTac());
        qtct.setChucDanhCongTac(chucDanh);

        ChucVu chucVu = new ChucVu();
        chucVu.setChucVuId(response.getChucVu());
        qtct.setChucVu(chucVu);

        NhaKhoaHoc nhaKhoaHoc = new NhaKhoaHoc();
        nhaKhoaHoc.setNhaKhoaHocId(response.getNhakhoahoc());

        qtct.setTuNam(response.getTuNam());
        qtct.setDenNam(response.getDenNam());
        qtct.setCoQuanCongTac(coQuan);
        qtct.setChucDanhCongTac(chucDanh);
        qtct.setChucVu(chucVu);
        qtct.setNhaKhoaHoc(nhaKhoaHoc);
        qtct.setStatus(response.isStatus());

        quaTrinhCongTacRepository.save(qtct);
        return response;
    }

    @Override
    public CreateQTCTRequest getQTCT(int id) {
        QuaTrinhCongTac qtct = quaTrinhCongTacRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Qúa trình công tác không tồn tại!"));
        CreateQTCTRequest request = new CreateQTCTRequest();
        request.setId(qtct.getId());
        request.setCoQuanCongTac(qtct.getCoQuanCongTac().getId());
        request.setChucDanhCongTac(qtct.getChucDanhCongTac().getId());
        request.setChucVu(qtct.getChucVu().getChucVuId());
        request.setNhakhoahoc(qtct.getNhaKhoaHoc().getNhaKhoaHocId());
        request.setTuNam(qtct.getTuNam());
        request.setDenNam(qtct.getDenNam());
        request.setStatus(qtct.isStatus());
        return request;
    }

}
