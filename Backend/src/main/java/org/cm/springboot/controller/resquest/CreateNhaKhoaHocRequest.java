package org.cm.springboot.controller.resquest;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
public class CreateNhaKhoaHocRequest {
    private String fullname;
    private String email;
    private String dienthoai;
    private String diachi;
    private String chuyenmongiangday;
    private String trinhdongoaingu;
    private String gioitinh;
    private int chucdanh;
    private int nganhDaoTao;
    private int chuyenNganh;
    private int tenDonVi;
    private int ngach;
    private Date ngaySinh;
    private List<Integer> linhVucNghienCuu;
    private int hocvi;
    private boolean status;
}
