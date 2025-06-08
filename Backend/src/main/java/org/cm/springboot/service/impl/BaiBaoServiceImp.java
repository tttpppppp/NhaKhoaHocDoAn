package org.cm.springboot.service.impl;

import org.cm.springboot.controller.response.*;
import org.cm.springboot.controller.resquest.CreateRequestBaiBao;
import org.cm.springboot.exception.ResourceNotFoundException;
import org.cm.springboot.model.*;
import org.cm.springboot.repository.*;
import org.cm.springboot.service.BaiBaoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BaiBaoServiceImp implements BaiBaoService {
    @Autowired
    BaiBaoRepository baiBaoRepository;

    @Autowired
    TapChiRepository TapChiRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private TapChiRepository tapChiRepository;
    @Autowired
    NhaKhoaHocRepository nhaKhoaHocRepository;
    @Autowired
    LinhVucNghienCuuRepository linhVucNghienCuuRepository;
    @Autowired
    DonViRepository donViRepository;
    public BaiBao getBaiBaoById(int id) {
        return baiBaoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bài báo"));
    }


    @Override
    public BaiBaoPage getAllBaiBao(int page, int size, String tuKhoa,
                                   int capTapChi, int donVi, int linhVuc,
                                   int loaiTapChi, int tacGia, String tuThoiDiem,
                                   String denThoiDiem, int phanLoaiTapChi) {
        int pageNo = Math.max(page - 1, 0); // đảm bảo không bị âm
        Pageable pageable = PageRequest.of(pageNo , size);

        boolean hasFilters = StringUtils.hasLength(tuKhoa) || donVi != -1 ||
                capTapChi != -1 || phanLoaiTapChi != -1 || loaiTapChi != -1 ||
                linhVuc != -1 || tacGia != -1 || tuThoiDiem != null || denThoiDiem != null;

        if (tuKhoa == null) tuKhoa = "";
        else tuKhoa = tuKhoa.toLowerCase();

        if (hasFilters) {
            LocalDateTime tu = tuThoiDiem != null ? LocalDate.parse(tuThoiDiem).atStartOfDay() : null;
            LocalDateTime den = denThoiDiem != null ? LocalDate.parse(denThoiDiem).atStartOfDay() : null;

            Page<BaiBao> filterBaiBao = baiBaoRepository.searchBaiBao(
                    tuKhoa, capTapChi, donVi, linhVuc, loaiTapChi,
                    phanLoaiTapChi, tacGia, tu, den, pageable
            );
            return getBaiBaoPageResponse(pageNo, size, filterBaiBao);
        }

        Page<BaiBao> baibaos = baiBaoRepository.findByStatusTrue(pageable);
        return getBaiBaoPageResponse(pageNo, size, baibaos);
    }


    private BaiBaoPage getBaiBaoPageResponse(int page, int size ,Page<BaiBao> baiBaos) {
        List<BaiBaoResponse> baiBaoResponses = new ArrayList<>();
        for (BaiBao baiBao : baiBaos) {
            BaiBaoResponse baiBaoResponse = new BaiBaoResponse();
            baiBaoResponse.setId(baiBao.getId());
            baiBaoResponse.setTenBaiBao(baiBao.getTenBaiBao());
            baiBaoResponse.setTenTapChi(baiBao.getTapChi().getTenTapChi());
            baiBaoResponse.setTenCapTapChi(baiBao.getTapChi().getCapTapChi().getTen());
            baiBaoResponse.setTenLinhVuc(baiBao.getLinhVucNghienCuu().getTenLinhVuc());
            baiBaoResponse.setLienket(baiBao.getLienKet());
            baiBaoResponse.setTenTacGia(baiBao.getNhaKhoaHoc().getFullName());
            baiBaoResponse.setIssn(baiBao.getTapChi().getIssn());
            baiBaoResponses.add(baiBaoResponse);
        }
        return new BaiBaoPage(page , size , baiBaos.getTotalPages() , baiBaos.getTotalElements() , baiBaoResponses);
    }

    @Override
    public BaiBaoChiTietResponse getBaiBaoChiTiet(int id) {
        BaiBao baiBao = getBaiBaoById(id);
        BaiBaoChiTietResponse response = new BaiBaoChiTietResponse();
        TapChiResponse tapChiResponse = new TapChiResponse();
        tapChiResponse.setIssn(baiBao.getTapChi().getIssn());
        tapChiResponse.setTenTapChi(baiBao.getTapChi().getTenTapChi());
        tapChiResponse.setTenCapTapChi(baiBao.getTapChi().getCapTapChi().getTen());
        tapChiResponse.setTenLoaiTapChi(baiBao.getTapChi().getLoaiTapChi().getTen());
        tapChiResponse.setTenPhanLoai(baiBao.getTapChi().getPhanLoaiTapChi().getTen());
        tapChiResponse.setNam(baiBao.getTapChi().getNamDang());
        tapChiResponse.setTap(baiBao.getTapChi().getTap());
        tapChiResponse.setSo(baiBao.getTapChi().getSo());
        tapChiResponse.setTrang(baiBao.getTapChi().getTrang());
        tapChiResponse.setTenCoQuanXuatBan(baiBao.getTapChi().getCoquanxuatban());

        response.setTenBaiBao(baiBao.getTenBaiBao());
        response.setLienket(baiBao.getLienKet());
        response.setTenLinhVuc(baiBao.getLinhVucNghienCuu().getTenLinhVuc());
        response.setTenTacGia(baiBao.getNhaKhoaHoc().getFullName());
        response.setTapChiResponse(tapChiResponse);

        return response;
    }

    @Override
    public List<BaiBaoResponse> getAllBaiBaoAdmin() {
        List<BaiBao> baiBaoList = baiBaoRepository.findAll();
        List<BaiBaoResponse> baiBaoResponses = new ArrayList<>();
        for (BaiBao baiBao : baiBaoList) {
            BaiBaoResponse baiBaoResponse = new BaiBaoResponse();
            baiBaoResponse.setId(baiBao.getId());
            baiBaoResponse.setTenBaiBao(baiBao.getTenBaiBao());
            baiBaoResponse.setTenTapChi(baiBao.getTapChi().getTenTapChi());
            baiBaoResponse.setTenCapTapChi(baiBao.getTapChi().getCapTapChi().getTen());
            baiBaoResponse.setTenLinhVuc(baiBao.getLinhVucNghienCuu().getTenLinhVuc());
            baiBaoResponse.setLienket(baiBao.getLienKet());
            baiBaoResponse.setTenTacGia(baiBao.getNhaKhoaHoc().getFullName());
            baiBaoResponse.setIssn(baiBao.getTapChi().getIssn());
            baiBaoResponse.setStatus(baiBao.isStatus());
            baiBaoResponses.add(baiBaoResponse);
        }
        return baiBaoResponses;
    }

    @Override
    public BaiBaoCreateForm getBaiBaoCreateForm() {
        BaiBaoCreateForm baiBaoCreateForm = new BaiBaoCreateForm();
        baiBaoCreateForm.setTapChiResponses(mapList(tapChiRepository.findAll(), TapChiResponse.class));
        baiBaoCreateForm.setLinhVucNghienCuuResponses(mapList(linhVucNghienCuuRepository.findAll(), LinhVucNghienCuuResponse.class));
        baiBaoCreateForm.setNhaKhoaHocFormResponses(mapList(nhaKhoaHocRepository.findAll(), NhaKhoaHocFormResponse.class));
        baiBaoCreateForm.setDonViResponses(mapList(donViRepository.findAll(), DonViResponse.class));
        return baiBaoCreateForm;
    }

    @Override
    public boolean createBaiBao(CreateRequestBaiBao createRequestBaiBao) {
        BaiBao baiBao = new BaiBao();
        TapChi tapChi = new TapChi();
        tapChi.setId(createRequestBaiBao.getIdTapChi());
        NhaKhoaHoc nhaKhoaHoc = new NhaKhoaHoc();
        nhaKhoaHoc.setNhaKhoaHocId(createRequestBaiBao.getIdTacGia());
        LinhVucNghienCuu linhVucNghienCuu = new LinhVucNghienCuu();
        DonViQuanLy donViQuanLy = new DonViQuanLy();
        donViQuanLy.setDonViId(createRequestBaiBao.getIdDonVi());
        linhVucNghienCuu.setId(createRequestBaiBao.getIdLinhVuc());
        baiBao.setTenBaiBao(createRequestBaiBao.getTenBaiBao());
        baiBao.setLienKet(createRequestBaiBao.getLienket());
        baiBao.setLinhVucNghienCuu(linhVucNghienCuu);
        baiBao.setDonViQuanLy(donViQuanLy);
        baiBao.setNhaKhoaHoc(nhaKhoaHoc);
        baiBao.setTapChi(tapChi);
        baiBao.setStatus(true);
        baiBaoRepository.save(baiBao);
        return true;
    }

    private <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
        return source.stream()
                .map(element -> modelMapper.map(element, targetClass))
                .toList();
    }
}
