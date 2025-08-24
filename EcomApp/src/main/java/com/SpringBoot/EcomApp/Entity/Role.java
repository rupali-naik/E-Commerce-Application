package com.SpringBoot.EcomApp.Entity;
//import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Role {
//    @Id
//    private String roleName;
//    private String roleDescription;
//
//    @ManyToMany(mappedBy = "role")
//    private Set<User> user = new HashSet<>();
//
//    public Set<User> getUser() {
//        return user;
//    }
//
//    public void setUser(Set<User> user) {
//        this.user = user;
//    }
//
//    public String getRoleName() {
//        return roleName;
//    }
//
//    public void setRoleName(String roleName) {
//        this.roleName = roleName;
//    }
//
//    public String getRoleDescription() {
//        return roleDescription;
//    }
//
//    public void setRoleDescription(String roleDescription) {
//        this.roleDescription = roleDescription;
@Id
private String roleName;
    private String roleDescription;

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleDescription() {
        return roleDescription;
    }

    public void setRoleDescription(String roleDescription) {
        this.roleDescription = roleDescription;
    }
}
