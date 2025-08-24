package com.SpringBoot.EcomApp.DAO;

import com.SpringBoot.EcomApp.Entity.User;
import org.springframework.context.annotation.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends CrudRepository<User,String> {
}
