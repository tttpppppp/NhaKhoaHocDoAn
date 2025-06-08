package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "bac_dao_tao")
public class BacDaoTao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bac_dao_tao_id")
    private Long id;

    @Column(name = "ten_bac")
    private String ten;

    @OneToMany(mappedBy = "bacDaoTao")
    private List<QuaTrinhDaoTao> quaTrinhDaoTaoList;
}
