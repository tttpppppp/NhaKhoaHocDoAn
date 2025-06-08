package org.cm.springboot.model;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private int role_id;

    @Column(name = "rolename")
    private String rolename;

    @Column(name = "description")
    private String description;

    @Column(name = "create_date")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;

    @OneToMany(mappedBy = "role")
    private List<UserHasRole> userHasRole;

    @OneToMany(mappedBy = "role")
    private Set<RoleHasPermission> roleHasPermissions;


    public List<UserHasRole> getUserHasRole() {
        return userHasRole;
    }

    public void setUserHasRole(List<UserHasRole> userHasRole) {
        this.userHasRole = userHasRole;
    }

    public int getRole_id() {
        return role_id;
    }

    public void setRole_id(int role_id) {
        this.role_id = role_id;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<RoleHasPermission> getRoleHasPermissions() {
        return roleHasPermissions;
    }

    public void setRoleHasPermissions(Set<RoleHasPermission> roleHasPermissions) {
        this.roleHasPermissions = roleHasPermissions;
    }
}
