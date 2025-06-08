package org.cm.springboot.repository;

import org.cm.springboot.model.NhaKhoaHoc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NhaKhoaHocRepository extends JpaRepository<NhaKhoaHoc, Integer> {
    @Query("SELECT DISTINCT n FROM NhaKhoaHoc n JOIN n.baiBaoList b")
    List<NhaKhoaHoc> findAllHavingBaiBao();

    Page<NhaKhoaHoc> findByStatusTrue(Pageable pageable);

    @Query("SELECT DISTINCT k FROM NhaKhoaHoc k " +
            "LEFT JOIN k.nhaKhoaHocLinhVucList l " +
            "WHERE ((lower(k.fullName) LIKE %:keyword% OR k.dienThoai LIKE %:keyword%) AND k.status = true)" +
            "AND ( :donvi = -1 OR k.donViQuanLy.donViId = :donvi ) " +
            "AND ( :ngach = -1 OR k.ngachCongChuc.ngachId = :ngach ) " +
            "AND ( :chucdanh = -1 OR k.chucDanhKhoaHoc.chucDanhId = :chucdanh ) " +
            "AND ( :hocvi = -1 OR k.hocVi.hocViId = :hocvi ) " +
            "AND ( :linhvucnghiencuu = -1 OR l.linhVucNghienCuu.id = :linhvucnghiencuu )")
    Page<NhaKhoaHoc> searchFilter(
            @Param("keyword") String keyword,
            @Param("donvi") int donvi,
            @Param("ngach") int ngach,
            @Param("chucdanh") int chucdanh,
            @Param("hocvi") int hocvi,
            @Param("linhvucnghiencuu") int linhVuc,
            Pageable pageable
    );

}