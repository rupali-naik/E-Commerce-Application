package com.SpringBoot.EcomApp.DAO;

import com.SpringBoot.EcomApp.Entity.Cart;
import com.SpringBoot.EcomApp.Entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDao extends CrudRepository<Cart, Integer> {

    public List<Cart> findByUser(User user);
}
