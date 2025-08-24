package com.SpringBoot.EcomApp.Service;

import com.SpringBoot.EcomApp.DAO.CartDao;
import com.SpringBoot.EcomApp.DAO.ProductDao;
import com.SpringBoot.EcomApp.DAO.UserDao;
import com.SpringBoot.EcomApp.Entity.Cart;
import com.SpringBoot.EcomApp.Entity.Product;
import com.SpringBoot.EcomApp.Entity.User;
import com.SpringBoot.EcomApp.configuration.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartDao cartDao;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private UserDao userDao;



    public void deleteCartItem(Integer cartId)
    {
        cartDao.deleteById(cartId);
    }


    public Cart addToCart(Integer productId){
        Product product =productDao.findById(productId).get();
        String username= JwtRequestFilter.CURRENT_USER;

        User user=null;
        if(username!=null) {
             user = userDao.findById(username).get();
        }

        List<Cart> cartList= cartDao.findByUser(user);
        List<Cart> filteredList= cartList.stream().filter(x -> x.getProduct().getProductId()==productId).collect(Collectors.toList());

        if(filteredList.size()>0)
            return null;

        if(product!=null && user!=null)
        {
            Cart cart=new Cart(product,user);
            cartDao.save(cart);
        }
        return null;
    }



    public List<Cart> getCartDetails(){
        String username=JwtRequestFilter.CURRENT_USER;
        User user=userDao.findById(username).get();
        return cartDao.findByUser(user);
    }
}
