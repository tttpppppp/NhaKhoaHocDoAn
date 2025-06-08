package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "co_quan_cong_tac")
public class CoQuanCongTac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "co_quan_id")
    private int id;

    @Column(name = "ten_co_quan")
    private String ten;

    @OneToMany(mappedBy = "coQuanCongTac")
    private List<QuaTrinhCongTac> quaTrinhCongTacList;
}
