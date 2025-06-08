package org.cm.springboot.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.cm.springboot.controller.response.ChucDanhResponse;
import org.cm.springboot.exception.ResourceNotFoundException;
import org.cm.springboot.model.ChucDanhKhoaHoc;
import org.cm.springboot.model.ChuyenNganh;
import org.cm.springboot.repository.ChucDanhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Slf4j
@Service
public class ChucDanhService  implements org.cm.springboot.service.ChucDanhService {

    @Autowired
    ChucDanhRepository chucDanhRepository;

    public ChucDanhKhoaHoc getChuyenNganhById(int id) {
        return chucDanhRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Chức danh không tồn tại!"));
    }
    @Override
    public List<ChucDanhResponse> getAllChucDanh() {
        List<ChucDanhKhoaHoc> chucDanhKhoaHoc = chucDanhRepository.findAll();
        List<ChucDanhResponse> chucDanhResponses = new ArrayList<>();
        for(var item : chucDanhKhoaHoc){
            ChucDanhResponse chucDanhResponse = new ChucDanhResponse();
            chucDanhResponse.setChucDanhId(item.getChucDanhId());
            chucDanhResponse.setTenChucDanh(item.getTenChucDanh());
            chucDanhResponse.setStatus(item.isStatus());
            chucDanhResponse.setMota(item.getMota());
            chucDanhResponses.add(chucDanhResponse);
        }
        return chucDanhResponses;
    }

    @Override
    public boolean deleteChucDanh(int id) {
        ChucDanhKhoaHoc kh = getChuyenNganhById(id);
        kh.setStatus(false);
        chucDanhRepository.save(kh);
        return true;
    }

    @Override
    public ChucDanhResponse updateChucDanh(ChucDanhResponse chucDanhResponse) {
        ChucDanhKhoaHoc kh = getChuyenNganhById(chucDanhResponse.getChucDanhId());
        kh.setTenChucDanh(chucDanhResponse.getTenChucDanh());
        kh.setMota(chucDanhResponse.getMota());
        kh.setStatus(chucDanhResponse.isStatus());
        chucDanhRepository.save(kh);
        return chucDanhResponse;
    }

    @Override
    public boolean createChucDanh(ChucDanhResponse chucDanhResponse) {
       try{
           log.info("Adding chuc danh");
           ChucDanhKhoaHoc chucDanhKhoaHoc = new ChucDanhKhoaHoc();
           chucDanhKhoaHoc.setTenChucDanh(chucDanhResponse.getTenChucDanh());
           chucDanhKhoaHoc.setMota(chucDanhResponse.getMota());
           chucDanhKhoaHoc.setStatus(chucDanhResponse.isStatus());
           chucDanhRepository.save(chucDanhKhoaHoc);
           return true;
       }catch (Exception e){
           return false;
       }
    }
}
