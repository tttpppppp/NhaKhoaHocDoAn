package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "chuyen_nganh")
public class ChuyenNganh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chuyen_nganh_id")
    private int chuyenNganhId;

    @Column(name = "ten_chuyen_nganh")
    private String tenChuyenNganh;

    @Column(name = "mota")
    private String mota;

    @Column(name = "status")
    private boolean status;

    @OneToMany(mappedBy = "chuyenNganh")
    private List<NhaKhoaHoc> nhaKhoaHocList;
}
