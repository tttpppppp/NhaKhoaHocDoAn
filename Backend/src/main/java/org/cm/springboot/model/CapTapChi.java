package org.cm.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "cap_tap_chi")
public class CapTapChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cap_tap_chi_id")
    private int id;

    @Column(name = "ten", nullable = false)
    private String ten;

    @OneToMany(mappedBy = "capTapChi")
    private List<TapChi> tapChi;
}
