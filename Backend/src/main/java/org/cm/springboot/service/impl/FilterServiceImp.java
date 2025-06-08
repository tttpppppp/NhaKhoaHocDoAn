package org.cm.springboot.service.impl;

import org.cm.springboot.controller.response.*;
import org.cm.springboot.model.*;
import org.cm.springboot.repository.*;
import org.cm.springboot.service.FilterService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilterServiceImp implements FilterService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    ChucDanhRepository chucDanhRepository;
    @Autowired
    DonViRepository donViRepository;
    @Autowired
    HocViRepository hocViRepository;
    @Autowired
    LinhVucNghienCuuRepository linhVucNghienCuuRepository;
    @Autowired
    NgachRepository ngachRepository;
    @Autowired
    ChuyenNganhRepository chuyenNganhRepository;
    @Autowired
    NganhDaoTaoRepository nganhDaoTaoRepository;
    @Autowired
    CoQuanCongTacRepository coQuanCongTacRepository;
    @Autowired
    ChucDanhCongTacRepository chucDanhCongTacRepository;
    @Autowired
    ChucVuRepository chucVuRepository;
    @Autowired
    private NhaKhoaHocRepository nhaKhoaHocRepository;
    @Autowired
    CapTapChiRepository CapTapChiRepository;
    @Autowired
    LoaiTapChiRepository LoaiTapChiRepository;
    @Autowired
    private LoaiTapChiRepository loaiTapChiRepository;
    @Autowired
    private CapTapChiRepository capTapChiRepository;
    @Autowired
    private PhanLoaiTapChiReposity phanLoaiTapChiRepository;

    @Override
    public FilterResponse getFilter() {
        FilterResponse filterResponse = new FilterResponse();
        filterResponse.setChucDanhResponses(mapList(chucDanhRepository.findAll(), ChucDanhResponse.class));
        filterResponse.setDonViResponses(mapList(donViRepository.findAll(), DonViResponse.class));
        filterResponse.setHocViResponses(mapList(hocViRepository.findAll(), HocViResponse.class));
        filterResponse.setLinhVucNghienCuuResponses(mapList(linhVucNghienCuuRepository.findAll(), LinhVucNghienCuuResponse.class));
        filterResponse.setNgachRespionses(mapList(ngachRepository.findAll(), NgachResponse.class));
        return filterResponse;
    }

    @Override
    public CreateNhaKhoaHocResponse createNhaKhoaHocForm() {
        CreateNhaKhoaHocResponse createNhaKhoaHocResponse = new CreateNhaKhoaHocResponse();
        createNhaKhoaHocResponse.setHocViResponses(mapList(hocViRepository.findAll(), HocViResponse.class));
        createNhaKhoaHocResponse.setLinhVucNghienCuuResponses(mapList(linhVucNghienCuuRepository.findAll(), LinhVucNghienCuuResponse.class));
        createNhaKhoaHocResponse.setNgachRespionses(mapList(ngachRepository.findAll(), NgachResponse.class));
        createNhaKhoaHocResponse.setChucDanhResponses(mapList(chucDanhRepository.findAll(), ChucDanhResponse.class));
        createNhaKhoaHocResponse.setDonViResponses(mapList(donViRepository.findAll(), DonViResponse.class));
        createNhaKhoaHocResponse.setChuyenNganhResponses(mapList(chuyenNganhRepository.findAll(), ChuyenNganhResponse.class));
        createNhaKhoaHocResponse.setNganhDaoTaoResponses(mapList(nganhDaoTaoRepository.findAll(), NganhDaoTaoResponse.class));
        return createNhaKhoaHocResponse;
    }

    @Override
    public CreateQTCTResponse createQuaTrinhDaoTaoForm() {
        CreateQTCTResponse createQTCTResponse = new CreateQTCTResponse();
        createQTCTResponse.setCoQuanCongTacResponse(mapList(coQuanCongTacRepository.findAll(), CoQuanCongTacResponse.class));
        createQTCTResponse.setChucDanhCongTacResponse(mapList(chucDanhCongTacRepository.findAll(), ChucDanhCongTacResponse.class));
        createQTCTResponse.setChucVuResponse(mapList(chucVuRepository.findAll(), ChucVuResponse.class));
        createQTCTResponse.setNhaKhoaHocFormResponse(mapList(nhaKhoaHocRepository.findAll(), NhaKhoaHocFormResponse.class));
        return createQTCTResponse;
    }

    @Override
    public FilterBaiBaoResponse getFilterBaiBao() {
        FilterBaiBaoResponse filterBaiBao = new FilterBaiBaoResponse();
        filterBaiBao.setDonViResponse(mapList(donViRepository.findAll(), DonViResponse.class));
        filterBaiBao.setNhaKhoaHocFormResponse(mapList(nhaKhoaHocRepository.findAllHavingBaiBao(), NhaKhoaHocFormResponse.class));
        filterBaiBao.setLinhVucNghienCuuResponse(mapList(linhVucNghienCuuRepository.findAll(), LinhVucNghienCuuResponse.class));
        filterBaiBao.setLoaiTapChiResponse(mapList(loaiTapChiRepository.findAll(), LoaiTapChiResponse.class));
        filterBaiBao.setCapTapChiResponse(mapList(capTapChiRepository.findAll(), CapTapChiResponse.class));
        filterBaiBao.setPhanLoaiTapChiResponse(mapList(phanLoaiTapChiRepository.findAll(), PhanLoaiTapChiResponse.class));
        return filterBaiBao;
    }

    private <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
        return source.stream()
                .map(element -> modelMapper.map(element, targetClass))
                .toList();
    }
}
