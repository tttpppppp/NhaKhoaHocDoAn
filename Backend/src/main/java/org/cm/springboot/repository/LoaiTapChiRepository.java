package org.cm.springboot.repository;

import org.cm.springboot.model.LoaiTapChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoaiTapChiRepository extends JpaRepository<LoaiTapChi, Long> {
}
