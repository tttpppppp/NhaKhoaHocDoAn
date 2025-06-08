package org.cm.springboot.repository;

import org.cm.springboot.model.DonViQuanLy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonViRepository extends JpaRepository<DonViQuanLy , Integer> {
}
