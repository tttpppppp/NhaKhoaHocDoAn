package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "nha_khoa_hoc_linh_vuc")
public class NhaKhoaHocLinhVuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "nha_khoa_hoc_id")
    private NhaKhoaHoc nhaKhoaHoc;

    @ManyToOne
    @JoinColumn(name = "linh_vuc_id")
    private LinhVucNghienCuu linhVucNghienCuu;
}

