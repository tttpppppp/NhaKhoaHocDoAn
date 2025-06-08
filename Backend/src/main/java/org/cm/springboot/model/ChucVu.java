package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "chuc_vu")
public class ChucVu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chuc_vu_id")
    private int chucVuId;

    @Column(name = "ten_chuc_vu")
    private String tenChucVu;

    @Column(name = "status")
    private boolean status;

    @OneToMany(mappedBy = "chucVu")
    private List<QuaTrinhCongTac> quaTrinhCongTacList;
}
