package org.cm.springboot.repository;

import org.cm.springboot.model.HocVi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HocViRepository extends JpaRepository<HocVi , Integer> {
}
