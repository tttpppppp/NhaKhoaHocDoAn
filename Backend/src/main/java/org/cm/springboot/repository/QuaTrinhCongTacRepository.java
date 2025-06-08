package org.cm.springboot.repository;

import org.cm.springboot.model.QuaTrinhCongTac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuaTrinhCongTacRepository extends JpaRepository<QuaTrinhCongTac, Integer> {
}
