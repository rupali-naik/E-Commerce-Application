package com.SpringBoot.EcomApp.DAO;

import com.SpringBoot.EcomApp.Entity.OrderDetail;
import com.SpringBoot.EcomApp.Entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderDetailsDao extends CrudRepository<OrderDetail,Integer> {

    public List<OrderDetail> findByUser(User user);
    public List<OrderDetail> findByOrderStatus(String status);
}
