package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "linh_vuc_nghien_cuu")
public class LinhVucNghienCuu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "linh_vuc_id")
    private int id;

    @Column(name = "ten_linh_vuc")
    private String tenLinhVuc;

    @OneToMany(mappedBy = "linhVucNghienCuu")
    private List<NhaKhoaHocLinhVuc> nhaKhoaHocLinhVucList;

    @OneToMany(mappedBy = "linhVucNghienCuu")
    private List<BaiBao> baiBaoList;
}
