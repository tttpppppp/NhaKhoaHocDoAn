package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "tap_chi")
public class TapChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "ten_tap_chi", columnDefinition = "TEXT")
    private String tenTapChi;

    @Column(name = "issn")
    private String issn;

    @Column(name = "nam_dang")
    private Integer namDang;

    @Column(name = "tap")
    private String tap;

    @Column(name = "so")
    private String so;

    @Column(name = "trang")
    private String trang;

    @Column(name = "coquanxuatban")
    private String coquanxuatban;

    @ManyToOne
    @JoinColumn(name = "cap_tap_chi_id")
    private CapTapChi capTapChi;

    @ManyToOne
    @JoinColumn(name = "loai_tap_chi_id")
    private LoaiTapChi loaiTapChi;

    @ManyToOne
    @JoinColumn(name = "phan_loai_tap_chi_id")
    private PhanLoaiTapChi phanLoaiTapChi;

    @OneToMany(mappedBy = "tapChi")
    private List<BaiBao> baiBao;
}
