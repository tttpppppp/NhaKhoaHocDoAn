package org.cm.springboot.repository;

import org.cm.springboot.model.CapTapChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CapTapChiRepository extends JpaRepository<CapTapChi, Integer> {
}
