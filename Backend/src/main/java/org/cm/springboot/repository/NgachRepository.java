package org.cm.springboot.repository;

import org.cm.springboot.model.NgachCongChuc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NgachRepository extends JpaRepository< NgachCongChuc , Integer> {
}
