package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "co_so_dao_tao")
public class CoSoDaoTao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "co_so_id")
    private Long id;

    @Column(name = "ten_co_so")
    private String ten;

    @OneToMany(mappedBy = "coSoDaoTao")
    private List<QuaTrinhDaoTao> quaTrinhDaoTaoList;
}
