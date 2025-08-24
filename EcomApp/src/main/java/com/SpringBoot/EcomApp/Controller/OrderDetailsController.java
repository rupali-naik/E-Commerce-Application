package com.SpringBoot.EcomApp.Controller;

import com.SpringBoot.EcomApp.Entity.OrderDetail;
import com.SpringBoot.EcomApp.Entity.OrderInput;
import com.SpringBoot.EcomApp.Service.OrderDetailsService;
import com.SpringBoot.EcomApp.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderDetailsController {

    @Autowired
    private OrderDetailsService orderDetailsService;

    @PreAuthorize("hasRole('User') ")
    @PostMapping({"/placeOrder/{isCartCheckout}"})
    public  void placeOrder(@PathVariable (name="isCartCheckout")boolean isCartCheckout, @RequestBody OrderInput orderInput){
         orderDetailsService.placeOrder(orderInput,isCartCheckout);
    }


    @PreAuthorize("hasRole('User')")
    @GetMapping({"/getOrderDetails"})
    public List<OrderDetail> getOrderDetails()
    {
        return orderDetailsService.getOrderDetails();

    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping({"/getAllOrderDetails/{status}"})
    public List<OrderDetail> getAllOrderDetails(@PathVariable(name = "status") String status){
        return orderDetailsService.getAllOrderDetails(status);
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping({"/markOrderAsDelivered/{orderId}"})
    public void markOrderAsDelivered(@PathVariable (name="orderId")Integer orderId){
         orderDetailsService.markOrderAsDelivered(orderId);
    }
}
