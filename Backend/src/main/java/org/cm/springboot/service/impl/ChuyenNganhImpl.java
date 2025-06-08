package org.cm.springboot.service.impl;

import org.cm.springboot.controller.response.ChuyenNganhResponse;
import org.cm.springboot.controller.resquest.ChuyenNganhResquest;
import org.cm.springboot.exception.ResourceNotFoundException;
import org.cm.springboot.model.ChuyenNganh;
import org.cm.springboot.repository.ChuyenNganhRepository;
import org.cm.springboot.service.ChuyenNganhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChuyenNganhImpl implements ChuyenNganhService {
    @Autowired
    ChuyenNganhRepository chueNganhRepository;


    public ChuyenNganh getChuyenNganhById(long id) {
        return chueNganhRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Chuyên ngành không tồn tại!"));
    }
    @Override
    public List<ChuyenNganhResponse> getAllChuyenNganh() {
        List<ChuyenNganh> chuyenNganhs = chueNganhRepository.findAll();
        List<ChuyenNganhResponse> chuyenNganhResponses = new ArrayList<>();
        for(var item : chuyenNganhs){
            ChuyenNganhResponse chuyenNganhResponse = new ChuyenNganhResponse();
            chuyenNganhResponse.setId(item.getChuyenNganhId());
            chuyenNganhResponse.setTenChuyenNganh(item.getTenChuyenNganh());
            chuyenNganhResponse.setMota(item.getMota());
            chuyenNganhResponse.setStatus(item.isStatus());
            chuyenNganhResponses.add(chuyenNganhResponse);
        }
        return chuyenNganhResponses;
    }

    @Override
    public boolean addChuyenNganh(ChuyenNganhResquest nganh) {
     try{
         ChuyenNganh chuyenNganh = new ChuyenNganh();
         chuyenNganh.setMota(nganh.getMota());
         chuyenNganh.setTenChuyenNganh(nganh.getTenChuyenNganh());
         chuyenNganh.setStatus(nganh.isStatus());
         chueNganhRepository.save(chuyenNganh);
         return true;
     }catch (Exception e){
         return false;
     }
    }

    @Override
    public boolean deleteChuyenNganh(long id) {
        ChuyenNganh chuyenNganh = getChuyenNganhById(id);
        chuyenNganh.setStatus(false);
        chueNganhRepository.save(chuyenNganh);
        return true;
    }

    @Override
    public ChuyenNganhResponse updateChuyenNganh(ChuyenNganhResponse chuyenNganhResponse) {
        ChuyenNganh chuyenNganh = getChuyenNganhById(chuyenNganhResponse.getId());
        chuyenNganh.setTenChuyenNganh(chuyenNganhResponse.getTenChuyenNganh());
        chuyenNganh.setMota(chuyenNganhResponse.getMota());
        chuyenNganh.setStatus(chuyenNganhResponse.isStatus());
        chueNganhRepository.save(chuyenNganh);
        return chuyenNganhResponse;
    }
}
