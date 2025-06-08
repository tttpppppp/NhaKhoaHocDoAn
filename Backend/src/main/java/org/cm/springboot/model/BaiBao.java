package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "bai_bao")
public class BaiBao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bai_bao_id")
    private int id;

    @Column(name = "ten_bai_bao", nullable = false, columnDefinition = "TEXT")
    private String tenBaiBao;

    @Column(name = "thuoc_de_tai")
    private Long thuocDeTai;

    @Column(name = "lien_ket", columnDefinition = "TEXT")
    private String lienKet;

    @Column(name = "created_at", columnDefinition = "TEXT")
    private LocalDateTime ngayTao;

    @PrePersist
    protected void onCreate() {
        ngayTao = LocalDateTime.now();
    }

    @Column(name = "status", columnDefinition = "TEXT")
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "nha_khoa_hoc_id")
    private NhaKhoaHoc nhaKhoaHoc;

    @ManyToOne
    @JoinColumn(name = "tap_chi_id", nullable = false)
    private TapChi tapChi;

    @ManyToOne
    @JoinColumn(name = "don_vi_id", nullable = false)
    private DonViQuanLy donViQuanLy;

    @ManyToOne
    @JoinColumn(name = "linh_vuc_id", nullable = false)
    private LinhVucNghienCuu linhVucNghienCuu;
}