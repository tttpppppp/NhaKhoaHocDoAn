package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "nha_khoa_hoc")
public class NhaKhoaHoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nha_khoa_hoc_id")
    private int nhaKhoaHocId;

    @Column(name = "fullname")
    private String fullName;

    @Column(name = "image" , columnDefinition = "TEXT")
    private String image;

    @Column(name = "gioi_tinh")
    private String gioiTinh;

    @Column(name = "nam_sinh")
    private Date namSinh;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "dien_thoai")
    private String dienThoai;

    @Column(name = "email")
    private String email;

    @Column(name = "trinh_do_ngoai_ngu")
    private String trinhDoNgoaiNgu;

    @ManyToOne
    @JoinColumn(name = "chuyen_nganh_id")
    private ChuyenNganh chuyenNganh;

    @ManyToOne
    @JoinColumn(name = "ngach_id")
    private NgachCongChuc ngachCongChuc;

    @ManyToOne
    @JoinColumn(name = "hoc_vi_id")
    private HocVi hocVi;

    @ManyToOne
    @JoinColumn(name = "chuc_danh_id")
    private ChucDanhKhoaHoc chucDanhKhoaHoc;

    @ManyToOne
    @JoinColumn(name = "don_vi_id")
    private DonViQuanLy donViQuanLy;


    @Column(columnDefinition = "TEXT")
    private String chuyenMonGiangDay;

    @Column(name = "status")
    private boolean status;

    @OneToMany(mappedBy = "nhaKhoaHoc")
    private List<QuaTrinhCongTac> quaTrinhCongTacList;

    @OneToMany(mappedBy = "nhaKhoaHoc")
    private List<QuaTrinhDaoTao> quaTrinhDaoTaoList;

    @OneToMany(mappedBy = "nhaKhoaHoc")
    private List<NhaKhoaHocLinhVuc> nhaKhoaHocLinhVucList;

    @OneToMany(mappedBy = "nhaKhoaHoc")
    private List<BaiBao> baiBaoList;
}

