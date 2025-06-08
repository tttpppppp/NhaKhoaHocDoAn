package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "loai_tap_chi")
public class LoaiTapChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loai_tap_chi_id")
    private int id;

    @Column(name = "ten", nullable = false)
    private String ten;

    @OneToMany(mappedBy = "loaiTapChi")
    private List<TapChi> tapChi;
}