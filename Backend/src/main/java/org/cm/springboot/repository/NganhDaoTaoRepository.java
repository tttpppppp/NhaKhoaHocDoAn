package org.cm.springboot.repository;

import org.cm.springboot.model.NganhDaoTao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NganhDaoTaoRepository extends JpaRepository<NganhDaoTao, Integer> {
}
