package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "ngach_cong_chuc")
public class NgachCongChuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ngach_id")
    private int ngachId;

    @Column(name = "ten_ngach")
    private String tenNgach;

    @Column(name = "status")
    private boolean status;

    @OneToMany(mappedBy = "ngachCongChuc")
    private List<NhaKhoaHoc> nhaKhoaHocList;
}
