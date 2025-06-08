package org.cm.springboot.repository;

import org.cm.springboot.model.ChucDanhKhoaHoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChucDanhRepository extends JpaRepository<ChucDanhKhoaHoc, Integer> {
    List<ChucDanhKhoaHoc> findByStatus(boolean status);
}
