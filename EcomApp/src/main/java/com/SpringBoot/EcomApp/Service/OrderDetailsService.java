package com.SpringBoot.EcomApp.Service;

import com.SpringBoot.EcomApp.DAO.CartDao;
import com.SpringBoot.EcomApp.DAO.OrderDetailsDao;
import com.SpringBoot.EcomApp.DAO.ProductDao;
import com.SpringBoot.EcomApp.DAO.UserDao;
import com.SpringBoot.EcomApp.Entity.*;
import com.SpringBoot.EcomApp.configuration.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderDetailsService {

    private static final String ORDER_PLACED="Placed";
    @Autowired
    private OrderDetailsDao orderDetailsDao;
    @Autowired
    private ProductDao productDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private CartDao cartDao;

//    @Autowired
//    private User user;



    public void placeOrder(OrderInput orderInput, boolean isCartCheckout){
        List<OrderProductQuantity> productQuantityList=orderInput.getOrderProductQuantityList();
        for(OrderProductQuantity o: productQuantityList)
        {
            Product product= productDao.findById(o.getProductId()).get();
            String currentUser= JwtRequestFilter.CURRENT_USER;
            User user=userDao.findById(currentUser).get();

            OrderDetail orderDetail=new OrderDetail(orderInput.getFullName(),orderInput.getFullAddress(),orderInput.getContactNumber(),orderInput.getAlternateContactNumber(),ORDER_PLACED,product.getDiscountedPrice()*o.getQuantity(),product,user);

            if(!isCartCheckout)
            {
                List<Cart> carts=cartDao.findByUser(user);
                carts.stream().forEach(x -> cartDao.deleteById(x.getCartId()));
            }
            orderDetailsDao.save(orderDetail);
        }
    }

    public List<OrderDetail> getOrderDetails(){
        String currentUser= JwtRequestFilter.CURRENT_USER;
//        User user = userDao.findById(currentUser).get();
        User user = userDao.findById(currentUser)
                .orElseThrow(() -> new RuntimeException("User not found: " + currentUser));
        return orderDetailsDao.findByUser(user);
    }

    public List<OrderDetail> getAllOrderDetails(String status){

        List<OrderDetail> orderDetails=new ArrayList<>();
        if(status.equals("All"))
         orderDetailsDao.findAll().forEach(x->orderDetails.add(x));

        else{
            orderDetailsDao.findByOrderStatus(status).forEach(x->orderDetails.add(x));
        }
         return orderDetails;


    }

    public void markOrderAsDelivered(Integer orderId){

        OrderDetail orderDetail= orderDetailsDao.findById(orderId).get();

        if(orderDetail!=null)
        {
            orderDetail.setOrderStatus("Delivered");
            orderDetailsDao.save(orderDetail);
        }



    }
}
