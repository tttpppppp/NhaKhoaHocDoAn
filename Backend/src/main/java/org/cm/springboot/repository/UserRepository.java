package org.cm.springboot.repository;

import org.cm.springboot.model.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);
    Users findByFullname(String username);

    @Query("SELECT u FROM Users u WHERE u.status = 'ACTIVE' AND (lower(u.fullname) LIKE %:keyword% OR u.mobile LIKE %:keyword%)")
    Page<Users> searchByKeyword(@Param("keyword") String keyword , Pageable pageable);
}
