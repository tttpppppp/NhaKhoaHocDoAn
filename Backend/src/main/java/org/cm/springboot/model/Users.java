package org.cm.springboot.model;


import jakarta.persistence.*;
import org.cm.springboot.common.UserStatus;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "users")
public class Users implements Serializable , UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "email" , unique = true , nullable = false)
    private String email;

    @Column(name = "fullname" , nullable = false)
    private String fullname;

    @Column(name = "mobile" , nullable = false)
    private String mobile;

    @Column(name = "password" , nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private UserStatus status;


    @Column(name = "create_date")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;

    @OneToMany(mappedBy = "user" , fetch = FetchType.EAGER , cascade = CascadeType.ALL)
    private List<UserHasRole> userHasRole;


    public List<UserHasRole> getUserHasRole() {
        return userHasRole;
    }

    public void setUserHasRole(List<UserHasRole> userHasRole) {
        this.userHasRole = userHasRole;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Override
    public Collection<SimpleGrantedAuthority> getAuthorities() {
        List<String> roleName = userHasRole.stream().map(u -> u.getRole().getRolename()).toList();
        return roleName.stream().map(SimpleGrantedAuthority::new).toList();
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserStatus.ACTIVE.equals(status);
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
