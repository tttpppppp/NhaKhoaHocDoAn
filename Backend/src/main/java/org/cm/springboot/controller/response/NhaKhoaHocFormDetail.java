package org.cm.springboot.controller.response;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class NhaKhoaHocFormDetail {
    private String fullname;
    private String email;
    private String address;
    private String dienThoai;
    private String trinhDoNgoaiNgu;
    private String image;
    private int chucdanhId;
    private String gioiTinh;
    private int chuyenNganhid;
    private int donViId;
    private List<Integer> linhVucIds;
    private int ngachid;
    private int hocviId;
    private String chuyenMonGiangDay;
    private boolean status;
    private Date ngaySinh;
}
