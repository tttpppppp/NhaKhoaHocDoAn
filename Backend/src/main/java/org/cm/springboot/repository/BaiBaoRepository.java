package org.cm.springboot.repository;

import org.cm.springboot.model.BaiBao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BaiBaoRepository extends JpaRepository<BaiBao, Integer> {
    Page<BaiBao> findByStatusTrue(Pageable pageable);

    @Query("SELECT b FROM BaiBao b " +
            "WHERE (:tuKhoa IS NULL OR LOWER(b.tenBaiBao) LIKE %:tuKhoa% OR LOWER(b.lienKet) LIKE %:tuKhoa%) " +
            "AND (:capTapChi = -1 OR b.tapChi.capTapChi.id = :capTapChi) " +
            "AND (:donVi = -1 OR b.donViQuanLy.id = :donVi) " +
            "AND (:linhVuc = -1 OR b.linhVucNghienCuu.id = :linhVuc) " +
            "AND (:loaiTapChi = -1 OR b.tapChi.loaiTapChi.id = :loaiTapChi) " +
            "AND (:phanLoaiTapChi = -1 OR b.tapChi.phanLoaiTapChi.id = :phanLoaiTapChi) " +
            "AND (:tacGia = -1 OR b.nhaKhoaHoc.id = :tacGia) " +
            "AND (:tuThoiDiem IS NULL OR b.ngayTao >= :tuThoiDiem) " +
            "AND (:denThoiDiem IS NULL OR b.ngayTao <= :denThoiDiem)")
    Page<BaiBao> searchBaiBao(
            @Param("tuKhoa") String tuKhoa,
            @Param("capTapChi") int capTapChi,
            @Param("donVi") int donVi,
            @Param("linhVuc") int linhVuc,
            @Param("loaiTapChi") int loaiTapChi,
            @Param("phanLoaiTapChi") int phanLoaiTapChi,
            @Param("tacGia") int tacGia,
            @Param("tuThoiDiem") LocalDateTime tuThoiDiem,
            @Param("denThoiDiem") LocalDateTime denThoiDiem,
            Pageable pageable
    );

}
