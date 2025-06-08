package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "chuc_danh_khoa_hoc")
public class ChucDanhKhoaHoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chuc_danh_id")
    private int chucDanhId;

    @Column(name = "ten_chuc_danh")
    private String tenChucDanh;

    @Column(name = "mota")
    private String mota;

    @Column(name = "status")
    private boolean status;

    @OneToMany(mappedBy = "chucDanhKhoaHoc")
    private List<NhaKhoaHoc> nhaKhoaHocList;
}
