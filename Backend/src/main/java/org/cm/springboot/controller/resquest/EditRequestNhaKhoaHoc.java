package org.cm.springboot.controller.resquest;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class EditRequestNhaKhoaHoc {
    private int id;
    private String address;
    private int chucdanhId;
    private String chuyenMonGiangDay;
    private int chuyenNganhid;
    private String dienThoai;
    private int donViId;
    private String email;
    private String fullname;
    private String gioiTinh;
    private int hocviId;
    private String image;
    private List<Integer> linhVucIds;
    private int ngachid;
    private Date ngaySinh;
    private boolean status;
    private String trinhDoNgoaiNgu;
}
