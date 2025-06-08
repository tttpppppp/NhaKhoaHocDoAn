package org.cm.springboot.repository;

import org.cm.springboot.model.LinhVucNghienCuu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LinhVucNghienCuuRepository extends JpaRepository<LinhVucNghienCuu ,Integer> {
}
