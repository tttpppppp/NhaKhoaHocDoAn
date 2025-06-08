package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "qua_trinh_dao_tao")
public class QuaTrinhDaoTao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qua_trinh_dao_tao_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "nha_khoa_hoc_id")
    private NhaKhoaHoc nhaKhoaHoc;

    @ManyToOne
    @JoinColumn(name = "co_so_id")
    private CoSoDaoTao coSoDaoTao;

    @ManyToOne
    @JoinColumn(name = "nganh_id")
    private NganhDaoTao nganhDaoTao;

    @ManyToOne
    @JoinColumn(name = "bac_dao_tao_id")
    private BacDaoTao bacDaoTao;

    @Column(name = "tu_nam")
    private Integer tuNam;

    @Column(name = "den_nam")
    private Integer denNam;
}
