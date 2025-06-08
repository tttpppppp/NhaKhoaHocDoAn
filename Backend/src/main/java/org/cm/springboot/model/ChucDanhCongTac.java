package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "chuc_danh_cong_tac")
public class ChucDanhCongTac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chuc_danh_cong_tac_id")
    private int id;

    @Column(name = "ten_chuc_danh_cong_tac")
    private String ten;

    @Column(name = "status")
    private boolean status;

    @OneToMany(mappedBy = "chucDanhCongTac")
    private List<QuaTrinhCongTac> quaTrinhCongTacList;
}
