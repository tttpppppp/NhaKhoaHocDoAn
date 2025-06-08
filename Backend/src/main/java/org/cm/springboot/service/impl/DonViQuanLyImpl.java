package org.cm.springboot.service.impl;

import org.cm.springboot.controller.response.DonViResponse;
import org.cm.springboot.exception.ResourceNotFoundException;
import org.cm.springboot.model.ChuyenNganh;
import org.cm.springboot.model.DonViQuanLy;
import org.cm.springboot.repository.DonViRepository;
import org.cm.springboot.service.DonViQuanLyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DonViQuanLyImpl implements DonViQuanLyService {

    @Autowired
    DonViRepository donViRepository;

    public DonViQuanLy getDonViById(int id) {
        return donViRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Đơn vị không tồn tại!"));
    }
    @Override
    public List<DonViResponse> getAllDonVi() {
        List<DonViQuanLy> listDonVi= donViRepository.findAll();
        List<DonViResponse> list= new ArrayList<>();
        for(var item :listDonVi ){
            DonViResponse donViResponse=new DonViResponse();
            donViResponse.setDonViId(item.getDonViId());
            donViResponse.setTenDonVi(item.getTenDonVi());
            donViResponse.setEmail(item.getEmail());
            donViResponse.setDienthoai(item.getDienthoai());
            donViResponse.setStatus(item.isStatus());
            donViResponse.setDiachi(item.getDiachi());
            list.add(donViResponse);
        }
        return list;
    }

    @Override
    public boolean addDonVi(DonViResponse donViResponse) {
      try{
          DonViQuanLy donvi = new DonViQuanLy();
          donvi.setDonViId(donViResponse.getDonViId());
          donvi.setTenDonVi(donViResponse.getTenDonVi());
          donvi.setEmail(donViResponse.getEmail());
          donvi.setDienthoai(donViResponse.getDienthoai());
          donvi.setStatus(donViResponse.isStatus());
          donViRepository.save(donvi);
          return true;
      }catch (Exception e) {
          return false;
      }
    }

    @Override
    public DonViResponse updateDonVi(DonViResponse donViResponse) {
        DonViQuanLy donvi =getDonViById(donViResponse.getDonViId());
        donvi.setTenDonVi(donViResponse.getTenDonVi());
        donvi.setEmail(donViResponse.getEmail());
        donvi.setDienthoai(donViResponse.getDienthoai());
        donvi.setStatus(donViResponse.isStatus());
        donvi.setDiachi(donViResponse.getDiachi());
        donViRepository.save(donvi);
        return donViResponse;
    }

    @Override
    public boolean deleteDonVi(int id) {
        DonViQuanLy donvi = getDonViById(id);
        donvi.setStatus(false);
        donViRepository.save(donvi);
        return true;
    }
}
