package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "hoc_vi")
public class HocVi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hoc_vi_id")
    private int hocViId;

    @Column(name = "ten_hoc_vi")
    private String tenHocVi;

    @Column(name = "mota")
    private String mota;

    @Column(name = "status")
    private boolean status;

    @OneToMany(mappedBy = "hocVi")
    private List<NhaKhoaHoc> nhaKhoaHocList;
}
