package org.cm.springboot.service;
import org.cm.springboot.controller.response.*;
import org.cm.springboot.controller.resquest.CreateNhaKhoaHocRequest;
import org.cm.springboot.controller.resquest.EditRequestNhaKhoaHoc;
import org.springframework.stereotype.Repository;


@Repository
public interface NhaKhoaHocService {
    NhaKhoaHocPage getAllNhaKhoaHoc(String keyword , int page , int size , int donvi , int ngach , int chucdanh,  int hocVi , int nghiencuu);
    NhaKhoaHocPage getAllNhaKhoaHocAdmin( int page , int size );
    NhaKhoaHocResponse getDetailNhaKhoaHoc(int id);
    NhaKhoaHocFormDetail getDetailNhaKhoaHocFormDetail(int id);
    boolean createNhaKhoaHoc(CreateNhaKhoaHocRequest createNhaKhoaHocRequest);
    EditRequestNhaKhoaHoc editNhakHoaHoc(EditRequestNhaKhoaHoc editRequestNhaKhoaHoc);
    boolean deleteNhaKhoaHoc(int id);
}
