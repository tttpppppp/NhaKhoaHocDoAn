package org.cm.springboot.repository;

import org.cm.springboot.model.TapChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TapChiRepository extends JpaRepository<TapChi, Long> {
}
