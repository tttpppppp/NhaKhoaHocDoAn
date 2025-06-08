package org.cm.springboot.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.cm.springboot.controller.response.*;
import org.cm.springboot.controller.resquest.CreateNhaKhoaHocRequest;
import org.cm.springboot.controller.resquest.EditRequestNhaKhoaHoc;
import org.cm.springboot.exception.ResourceNotFoundException;
import org.cm.springboot.model.*;
import org.cm.springboot.repository.NhaKhoaHocLinhVucRepository;
import org.cm.springboot.repository.NhaKhoaHocRepository;
import org.cm.springboot.service.NhaKhoaHocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NhakHoaHocServiceImpl implements NhaKhoaHocService {
    @Autowired
    NhaKhoaHocRepository nhaKhoaHocRepository;

    @Autowired
    NhaKhoaHocLinhVucRepository nhaKhoaHocLinhVucRepository;

    @Autowired
    RedisTemplate redisTemplate;
    private Gson gson = new Gson();
    public NhaKhoaHoc getNhakHoaHocId(int id){
        return nhaKhoaHocRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nhà khoa học không tồn tại"));
    }

    @Override
    public NhaKhoaHocPage getAllNhaKhoaHoc(String keyword, int page, int size, int donviId, int ngachId, int chucdanhid, int hocViId, int nghiencuuId) {
        int pageNo = 0;
        if(page > 0) {
            pageNo = page - 1;
        }
        Pageable listNhakHoaHocEntity = PageRequest.of(pageNo , size);
        Page<NhaKhoaHoc> nhaKhoaHocs = nhaKhoaHocRepository.findByStatusTrue(listNhakHoaHocEntity);
        boolean hasFilters = StringUtils.hasLength(keyword)|| donviId != -1 || ngachId != -1 || chucdanhid != -1 || hocViId != -1 || nghiencuuId != -1;
        if (hasFilters) {
            if (keyword == null) {
                keyword = "";
            } else {
                keyword = keyword.toLowerCase();
            }
            Page<NhaKhoaHoc> filtered = nhaKhoaHocRepository.searchFilter(keyword, donviId, ngachId, chucdanhid, hocViId, nghiencuuId, listNhakHoaHocEntity);
            return getHomeNhaKhoaHocPageResponse(page, size, filtered);
        }
        return getHomeNhaKhoaHocPageResponse(page , size , nhaKhoaHocs);
    }


    public NhaKhoaHocPage getHomeNhaKhoaHocPageResponse(int page, int size , Page<NhaKhoaHoc> nhaKhoaHocs) {
        List<NhaKhoaHocHomeResponse> nhaKhoaHocResponses = new ArrayList<>();
        for (var item : nhaKhoaHocs) {
            NhaKhoaHocHomeResponse nhaKhoaHocResponse = new NhaKhoaHocHomeResponse();
            nhaKhoaHocResponse.setId(item.getNhaKhoaHocId());
            nhaKhoaHocResponse.setFullname(item.getFullName());
            nhaKhoaHocResponse.setChucdanh(item.getChucDanhKhoaHoc().getTenChucDanh());
            nhaKhoaHocResponse.setChuyenNganh(item.getChuyenNganh().getTenChuyenNganh());
            nhaKhoaHocResponse.setNganhDaoTao(item.getChuyenNganh().getTenChuyenNganh());
            nhaKhoaHocResponse.setTenDonVi(item.getDonViQuanLy().getTenDonVi());
            nhaKhoaHocResponse.setImage(item.getImage());
            nhaKhoaHocResponses.add(nhaKhoaHocResponse);
        }
        return new NhaKhoaHocPage(page , size , nhaKhoaHocs.getTotalPages() , nhaKhoaHocs.getTotalElements() , nhaKhoaHocResponses);
    }
    @Override
    public NhaKhoaHocResponse getDetailNhaKhoaHoc(int id) {
        NhaKhoaHoc nhaKhoaHoc = getNhakHoaHocId(id);
        DonViQuanLy donViQuanLy = nhaKhoaHoc.getDonViQuanLy();
        NhaKhoaHocResponse nhaKhoaHocResponse = new NhaKhoaHocResponse();
        if(nhaKhoaHoc != null){
            nhaKhoaHocResponse.setFullname(nhaKhoaHoc.getFullName());
            nhaKhoaHocResponse.setChucdanh(nhaKhoaHoc.getChucDanhKhoaHoc().getTenChucDanh());
            nhaKhoaHocResponse.setGioiTinh(nhaKhoaHoc.getGioiTinh());
            nhaKhoaHocResponse.setImage(nhaKhoaHoc.getImage());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
            String formattedDate = sdf.format(nhaKhoaHoc.getNamSinh());
            nhaKhoaHocResponse.setNamSinh(formattedDate);
            nhaKhoaHocResponse.setDienThoai(nhaKhoaHoc.getDienThoai());
            nhaKhoaHocResponse.setEmail(nhaKhoaHoc.getEmail());
            nhaKhoaHocResponse.setAddress(nhaKhoaHoc.getDiaChi());
            nhaKhoaHocResponse.setNganhDaoTao(nhaKhoaHoc.getChuyenNganh().getTenChuyenNganh());
            nhaKhoaHocResponse.setChuyenNganh(nhaKhoaHoc.getChuyenNganh().getTenChuyenNganh());
            nhaKhoaHocResponse.setChuyenMonGiangDay(nhaKhoaHoc.getChuyenMonGiangDay());
            nhaKhoaHocResponse.setNgoaiNgu(nhaKhoaHoc.getTrinhDoNgoaiNgu());
            DonViResponse donViResponse = new DonViResponse();
            donViResponse.setDonViId(donViQuanLy.getDonViId());
            donViResponse.setTenDonVi(donViQuanLy.getTenDonVi());
            donViResponse.setDiachi(donViQuanLy.getDiachi());
            donViResponse.setEmail(donViQuanLy.getEmail());
            donViResponse.setDienthoai(donViQuanLy.getDienthoai());
            nhaKhoaHocResponse.setDonViResponse(donViResponse);
            List<QuaTrinhCongTacResponse> quaTrinhCongTacResponses = new ArrayList<>();
            for(var item : nhaKhoaHoc.getQuaTrinhCongTacList()){
                QuaTrinhCongTacResponse quaTrinhCongTacResponse = new QuaTrinhCongTacResponse();
                quaTrinhCongTacResponse.setId(item.getId());
                SimpleDateFormat s = new SimpleDateFormat("dd/MM/yyyy");
                String formatTuNam = s.format(item.getTuNam());
                String formatdenNam = s.format(item.getDenNam());
                quaTrinhCongTacResponse.setTuNam(formatTuNam);
                quaTrinhCongTacResponse.setDenNam(formatdenNam);
                quaTrinhCongTacResponse.setChucDanhCongTac(item.getChucDanhCongTac().getTen());
                quaTrinhCongTacResponse.setCoQuanCongTac(item.getCoQuanCongTac().getTen());
                quaTrinhCongTacResponse.setChucVu(item.getChucVu().getTenChucVu());
                quaTrinhCongTacResponses.add(quaTrinhCongTacResponse);
            }
            List<LinhVucNghienCuuResponse> linhVucNghienCuuResponses = new ArrayList<>();
            for(var item : nhaKhoaHoc.getNhaKhoaHocLinhVucList()){
                LinhVucNghienCuuResponse linhVucNghienCuuResponse = new LinhVucNghienCuuResponse();
                linhVucNghienCuuResponse.setId(item.getLinhVucNghienCuu().getId());
                linhVucNghienCuuResponse.setTenLinhVuc(item.getLinhVucNghienCuu().getTenLinhVuc());
                linhVucNghienCuuResponses.add(linhVucNghienCuuResponse);
            }
            List<QuaTrinhDaoTaoResponse> quaTrinhDaoTaoResponses = new ArrayList<>();
            for(var item : nhaKhoaHoc.getQuaTrinhDaoTaoList()){
                QuaTrinhDaoTaoResponse quaTrinhDaoTaoResponse = new QuaTrinhDaoTaoResponse();
                quaTrinhDaoTaoResponse.setCoSoDaoTao(item.getCoSoDaoTao().getTen());
                quaTrinhDaoTaoResponse.setBacDaoTao(item.getBacDaoTao().getTen());
                quaTrinhDaoTaoResponse.setNganhDaoTao(item.getNganhDaoTao().getTen());
                quaTrinhDaoTaoResponse.setNamTotNghiep(item.getDenNam());
                quaTrinhDaoTaoResponses.add(quaTrinhDaoTaoResponse);
            }
            nhaKhoaHocResponse.setSoLuongBaiBao(nhaKhoaHoc.getBaiBaoList().size());
            nhaKhoaHocResponse.setLinhVucNghienCuuResponses(linhVucNghienCuuResponses);
            nhaKhoaHocResponse.setQuaTrinhCongTacResponses(quaTrinhCongTacResponses);
            nhaKhoaHocResponse.setQuaTrinhDaoTaoResponses(quaTrinhDaoTaoResponses);
        }
        return nhaKhoaHocResponse;
    }

    @Override
    public NhaKhoaHocFormDetail getDetailNhaKhoaHocFormDetail(int id) {
        NhaKhoaHoc nhaKhoaHoc = getNhakHoaHocId(id);
        NhaKhoaHocFormDetail nhaKhoaHocFormDetail = new NhaKhoaHocFormDetail();

        nhaKhoaHocFormDetail.setFullname(nhaKhoaHoc.getFullName());
        nhaKhoaHocFormDetail.setEmail(nhaKhoaHoc.getEmail());
        nhaKhoaHocFormDetail.setDienThoai(nhaKhoaHoc.getDienThoai());
        nhaKhoaHocFormDetail.setAddress(nhaKhoaHoc.getDiaChi());
        nhaKhoaHocFormDetail.setImage(nhaKhoaHoc.getImage());
        nhaKhoaHocFormDetail.setStatus(nhaKhoaHoc.isStatus());
        nhaKhoaHocFormDetail.setTrinhDoNgoaiNgu(nhaKhoaHoc.getTrinhDoNgoaiNgu());
        nhaKhoaHocFormDetail.setChucdanhId(nhaKhoaHoc.getChucDanhKhoaHoc().getChucDanhId());
        nhaKhoaHocFormDetail.setDonViId(nhaKhoaHoc.getDonViQuanLy().getDonViId());
        nhaKhoaHocFormDetail.setChuyenMonGiangDay(nhaKhoaHoc.getChuyenMonGiangDay());
        nhaKhoaHocFormDetail.setChuyenNganhid(nhaKhoaHoc.getChuyenNganh().getChuyenNganhId());
        nhaKhoaHocFormDetail.setHocviId(nhaKhoaHoc.getHocVi().getHocViId());
        nhaKhoaHocFormDetail.setNgachid(nhaKhoaHoc.getNgachCongChuc().getNgachId());
        nhaKhoaHocFormDetail.setNgaySinh(nhaKhoaHoc.getNamSinh());
        nhaKhoaHocFormDetail.setGioiTinh(nhaKhoaHoc.getGioiTinh());

        List<Integer> listIds = nhaKhoaHoc.getNhaKhoaHocLinhVucList().stream()
                .map(item -> item.getLinhVucNghienCuu().getId())
                .collect(Collectors.toList());

        nhaKhoaHocFormDetail.setLinhVucIds(listIds);

        return nhaKhoaHocFormDetail;
    }

    @Transactional
    @Override
    public boolean createNhaKhoaHoc(CreateNhaKhoaHocRequest createNhaKhoaHocRequest) {
        try{
            NhaKhoaHoc nhaKhoaHoc = new NhaKhoaHoc();
            ChucDanhKhoaHoc chucDanhKhoaHoc = new ChucDanhKhoaHoc();
            chucDanhKhoaHoc.setChucDanhId(createNhaKhoaHocRequest.getChucdanh());
            ChuyenNganh chuyenNganh = new ChuyenNganh();
            chuyenNganh.setChuyenNganhId(createNhaKhoaHocRequest.getChuyenNganh());
            DonViQuanLy donViQuanLy = new DonViQuanLy();
            donViQuanLy.setDonViId(createNhaKhoaHocRequest.getTenDonVi());
            NgachCongChuc ngachCongChuc = new NgachCongChuc();
            ngachCongChuc.setNgachId(createNhaKhoaHocRequest.getNgach());
            HocVi hocVi = new HocVi();
            hocVi.setHocViId(createNhaKhoaHocRequest.getHocvi());
            nhaKhoaHoc.setFullName(createNhaKhoaHocRequest.getFullname());
            nhaKhoaHoc.setEmail(createNhaKhoaHocRequest.getEmail());
            nhaKhoaHoc.setChuyenMonGiangDay(createNhaKhoaHocRequest.getChuyenmongiangday());
            nhaKhoaHoc.setDiaChi(createNhaKhoaHocRequest.getDiachi());
            nhaKhoaHoc.setDienThoai(createNhaKhoaHocRequest.getDienthoai());
            nhaKhoaHoc.setTrinhDoNgoaiNgu(createNhaKhoaHocRequest.getTrinhdongoaingu());
            nhaKhoaHoc.setGioiTinh(createNhaKhoaHocRequest.getGioitinh());
            nhaKhoaHoc.setChucDanhKhoaHoc(chucDanhKhoaHoc);
            nhaKhoaHoc.setStatus(createNhaKhoaHocRequest.isStatus());
            nhaKhoaHoc.setNamSinh(createNhaKhoaHocRequest.getNgaySinh());
            nhaKhoaHoc.setChuyenNganh(chuyenNganh);
            nhaKhoaHoc.setDonViQuanLy(donViQuanLy);
            nhaKhoaHoc.setNgachCongChuc(ngachCongChuc);
            nhaKhoaHoc.setHocVi(hocVi);
            nhaKhoaHocRepository.save(nhaKhoaHoc);
            List<NhaKhoaHocLinhVuc> nhaKhoaHocLinhVucList = new ArrayList<>();
            for(var item : createNhaKhoaHocRequest.getLinhVucNghienCuu()){
                LinhVucNghienCuu linhVucNghienCuu = new LinhVucNghienCuu();
                NhaKhoaHocLinhVuc nhaKhoaHocLinhVuc = new NhaKhoaHocLinhVuc();
                linhVucNghienCuu.setId(item);
                nhaKhoaHocLinhVuc.setLinhVucNghienCuu(linhVucNghienCuu);
                nhaKhoaHocLinhVuc.setNhaKhoaHoc(nhaKhoaHoc);
                nhaKhoaHocLinhVucList.add(nhaKhoaHocLinhVuc);
            }
            nhaKhoaHocLinhVucRepository.saveAll(nhaKhoaHocLinhVucList);
            redisTemplate.delete("nhaKhoaHocListHomePage");
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public EditRequestNhaKhoaHoc editNhakHoaHoc(EditRequestNhaKhoaHoc editRequestNhaKhoaHoc) {
        HocVi hocVi = new HocVi();
        hocVi.setHocViId(editRequestNhaKhoaHoc.getHocviId());
        ChucDanhKhoaHoc chucDanhKhoaHoc = new ChucDanhKhoaHoc();
        chucDanhKhoaHoc.setChucDanhId(editRequestNhaKhoaHoc.getChucdanhId());
        ChuyenNganh chuyenNganh = new ChuyenNganh();
        chuyenNganh.setChuyenNganhId(editRequestNhaKhoaHoc.getChuyenNganhid());
        NgachCongChuc ngachCongChuc = new NgachCongChuc();
        ngachCongChuc.setNgachId(editRequestNhaKhoaHoc.getNgachid());
        NhaKhoaHoc nhaKhoaHoc = getNhakHoaHocId(editRequestNhaKhoaHoc.getId());
        List<NhaKhoaHocLinhVuc> nhaKhoaHocLinhVucList = new ArrayList<>();
        for(var item : editRequestNhaKhoaHoc.getLinhVucIds()){
            NhaKhoaHocLinhVuc nhaKhoaHocLinhVuc = new NhaKhoaHocLinhVuc();
            LinhVucNghienCuu linhVucNghienCuu = new LinhVucNghienCuu();
            NhaKhoaHoc nhaKhoaHoc1 = new NhaKhoaHoc();
            nhaKhoaHocLinhVuc.setNhaKhoaHoc(nhaKhoaHoc);
            linhVucNghienCuu.setId(item);
            nhaKhoaHocLinhVuc.setLinhVucNghienCuu(linhVucNghienCuu);
            nhaKhoaHocLinhVucList.add(nhaKhoaHocLinhVuc);
        }
        nhaKhoaHoc.setFullName(editRequestNhaKhoaHoc.getFullname());
        nhaKhoaHoc.setEmail(editRequestNhaKhoaHoc.getEmail());
        nhaKhoaHoc.setDiaChi(editRequestNhaKhoaHoc.getAddress());
        nhaKhoaHoc.setDienThoai(editRequestNhaKhoaHoc.getDienThoai());
        nhaKhoaHoc.setChuyenMonGiangDay(editRequestNhaKhoaHoc.getChuyenMonGiangDay());
        nhaKhoaHoc.setGioiTinh(editRequestNhaKhoaHoc.getGioiTinh());
        nhaKhoaHoc.setImage(editRequestNhaKhoaHoc.getImage());
        nhaKhoaHoc.setNamSinh(editRequestNhaKhoaHoc.getNgaySinh());
        nhaKhoaHoc.setTrinhDoNgoaiNgu(editRequestNhaKhoaHoc.getTrinhDoNgoaiNgu());
        nhaKhoaHoc.setStatus(editRequestNhaKhoaHoc.isStatus());
        nhaKhoaHoc.setHocVi(hocVi);
        nhaKhoaHoc.setChuyenNganh(chuyenNganh);
        nhaKhoaHoc.setChucDanhKhoaHoc(chucDanhKhoaHoc);
        nhaKhoaHoc.setNgachCongChuc(ngachCongChuc);
        nhaKhoaHoc.setNhaKhoaHocLinhVucList(nhaKhoaHocLinhVucList);
        nhaKhoaHocRepository.save(nhaKhoaHoc);
        return editRequestNhaKhoaHoc;
    }

    @Override
    public boolean deleteNhaKhoaHoc(int id) {
        NhaKhoaHoc nhaKhoaHoc = getNhakHoaHocId(id);
        nhaKhoaHoc.setStatus(false);
        nhaKhoaHocRepository.save(nhaKhoaHoc);
        return true;
    }

    public NhaKhoaHocPage getAllNhaKhoaHocAdmin(int page, int size) {
        int pageNo = 0;
        if(page > 0) {
            pageNo = page - 1;
        }
        Pageable listNhakHoaHocEntity = PageRequest.of(pageNo , size);
        Page<NhaKhoaHoc> list = nhaKhoaHocRepository.findAll(listNhakHoaHocEntity);
        return getNhaKhoaHocAdminResponse(page , size , list);
    }
    public NhaKhoaHocPage getNhaKhoaHocAdminResponse(int page, int size , Page<NhaKhoaHoc> nhaKhoaHocs) {
        List<NhaKhoaHocHomeResponse> nhaKhoaHocResponses = new ArrayList<>();
        for (var item : nhaKhoaHocs) {
            NhaKhoaHocHomeResponse nhaKhoaHocResponse = new NhaKhoaHocHomeResponse();
            nhaKhoaHocResponse.setId(item.getNhaKhoaHocId());
            nhaKhoaHocResponse.setFullname(item.getFullName());
            nhaKhoaHocResponse.setChucdanh(item.getChucDanhKhoaHoc().getTenChucDanh());
            nhaKhoaHocResponse.setChuyenNganh(item.getChuyenNganh().getTenChuyenNganh());
            nhaKhoaHocResponse.setNganhDaoTao(item.getChuyenNganh().getTenChuyenNganh());
            nhaKhoaHocResponse.setTenDonVi(item.getDonViQuanLy().getTenDonVi());
            nhaKhoaHocResponse.setImage(item.getImage());
            nhaKhoaHocResponse.setStatus(item.isStatus());
            nhaKhoaHocResponses.add(nhaKhoaHocResponse);
        }
        return new NhaKhoaHocPage(page , size , nhaKhoaHocs.getTotalPages() , nhaKhoaHocs.getTotalElements() , nhaKhoaHocResponses);
    }

}
