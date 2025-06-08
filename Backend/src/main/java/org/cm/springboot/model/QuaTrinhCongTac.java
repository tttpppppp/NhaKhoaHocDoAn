package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "qua_trinh_cong_tac")
public class QuaTrinhCongTac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qua_trinh_cong_tac_id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "nha_khoa_hoc_id")
    private NhaKhoaHoc nhaKhoaHoc;

    @ManyToOne
    @JoinColumn(name = "chuc_vu_id")
    private ChucVu chucVu;

    @ManyToOne
    @JoinColumn(name = "co_quan_id")
    private CoQuanCongTac coQuanCongTac;

    @ManyToOne
    @JoinColumn(name = "chuc_danh_cong_tac_id")
    private ChucDanhCongTac chucDanhCongTac;

    @Column(name = "tu_nam")
    private Date tuNam;

    @Column(name = "den_nam")
    private Date denNam;


    @Column(name = "status")
    private boolean status = true;

}
