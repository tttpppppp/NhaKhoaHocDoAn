package org.cm.springboot.repository;

import org.cm.springboot.model.NhaKhoaHocLinhVuc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NhaKhoaHocLinhVucRepository extends JpaRepository<NhaKhoaHocLinhVuc, Integer> {
}
