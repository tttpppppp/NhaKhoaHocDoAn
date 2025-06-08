package org.cm.springboot.repository;

import org.cm.springboot.model.UserHasRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHasRoleRepository extends JpaRepository<UserHasRole, Long> {
}
