package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "phan_loai_tap_chi")
public class PhanLoaiTapChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "phan_loai_tap_chi_id")
    private int id;

    @Column(name = "ten", nullable = false)
    private String ten;

    @OneToMany(mappedBy = "phanLoaiTapChi")
    private List<TapChi> tapChi;
}
