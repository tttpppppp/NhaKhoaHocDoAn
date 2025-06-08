package org.cm.springboot.repository;

import org.cm.springboot.model.PhanLoaiTapChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhanLoaiTapChiReposity extends JpaRepository<PhanLoaiTapChi,Integer> {
}
