package org.cm.springboot.service.impl;

import org.cm.springboot.controller.response.HocViResponse;
import org.cm.springboot.exception.ResourceNotFoundException;
import org.cm.springboot.model.HocVi;
import org.cm.springboot.repository.HocViRepository;
import org.cm.springboot.service.HocViService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HocViServiceImpl implements HocViService {
    @Autowired
    HocViRepository hocViRepository;

    public HocVi getDonViById(int id) {
        return hocViRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Đơn vị không tồn tại!"));
    }

    @Override
    public List<HocViResponse> getAllHocVi() {
        List<HocVi> hocViList = hocViRepository.findAll();
        List<HocViResponse> list = new ArrayList<HocViResponse>();
        for (HocVi hocVi : hocViList) {
            HocViResponse hocViResponse = new HocViResponse();
            hocViResponse.setHocViId(hocVi.getHocViId());
            hocViResponse.setTenHocVi(hocVi.getTenHocVi());
            hocViResponse.setMota(hocVi.getMota());
            hocViResponse.setStatus(hocVi.isStatus());
            list.add(hocViResponse);
        }
        return list;
    }

    @Override
    public boolean addDonVi(HocViResponse hocViResponse) {
     try{
         HocVi hocVi = new HocVi();
         hocVi.setHocViId(hocViResponse.getHocViId());
         hocVi.setTenHocVi(hocViResponse.getTenHocVi());
         hocVi.setMota(hocViResponse.getMota());
         hocVi.setStatus(hocViResponse.isStatus());
         hocViRepository.save(hocVi);
         return true;
     }catch (Exception e){
         return false;
     }
    }

    @Override
    public HocViResponse updateDonVi(HocViResponse hocViResponse) {
        HocVi hocVi = getDonViById(hocViResponse.getHocViId());
        hocVi.setTenHocVi(hocViResponse.getTenHocVi());
        hocVi.setMota(hocViResponse.getMota());
        hocVi.setStatus(hocViResponse.isStatus());
        hocViRepository.save(hocVi);
        return hocViResponse;
    }

    @Override
    public boolean deleteHocVi(int id) {
        HocVi hocVi = getDonViById(id);
        hocVi.setStatus(false);
        hocViRepository.save(hocVi);
        return true;
    }
}
