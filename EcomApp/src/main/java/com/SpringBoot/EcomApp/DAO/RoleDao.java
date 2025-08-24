package com.SpringBoot.EcomApp.DAO;

import com.SpringBoot.EcomApp.Entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDao extends CrudRepository<Role,String> {
}
