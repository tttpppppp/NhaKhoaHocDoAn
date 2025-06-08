package org.cm.springboot.repository;

import org.cm.springboot.model.CoQuanCongTac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoQuanCongTacRepository extends JpaRepository<CoQuanCongTac, Integer> {
}
