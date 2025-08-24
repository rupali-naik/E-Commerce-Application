package com.SpringBoot.EcomApp.Service;
import java.util.stream.Collectors;
import com.SpringBoot.EcomApp.DAO.CartDao;
import com.SpringBoot.EcomApp.DAO.ProductDao;
import com.SpringBoot.EcomApp.DAO.UserDao;
import com.SpringBoot.EcomApp.Entity.Cart;
import com.SpringBoot.EcomApp.Entity.Product;
import com.SpringBoot.EcomApp.Entity.User;
import com.SpringBoot.EcomApp.configuration.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductDao productDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private CartDao cartDao;

    public Product addNewProduct(Product product)
    {
        return productDao.save(product);
    }

    public List<Product> getAllProducts(int pageNumber, String searchKey ){
        Pageable pageable= PageRequest.of(pageNumber,8);// Pagination
        if(searchKey.equals("")){
            return (List<Product>) productDao.findAll(pageable);
        }
        else{
            return productDao.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(searchKey,searchKey,pageable);// for product name and product description 2 searchkeys
        }

    }

    public Product getProductDetailsById(Integer productId){
        return productDao.findById(productId).get();
    }


    public void deleteProductDetails(Integer productId)
    {
         productDao.deleteById(productId);
    }

    public List<Product> getProductDetails(boolean isSingleProductCheckout, Integer productId)
    {
        if(isSingleProductCheckout && productId != 0)
        {
            List<Product> list=new ArrayList<>();
            Product product= productDao.findById(productId).get();
            list.add(product);
            return list;
        }
        else {
                String username= JwtRequestFilter.CURRENT_USER;
                User user=userDao.findById(username).get();
                List<Cart> carts=cartDao.findByUser(user);

                return carts.stream().map(x-> x.getProduct()).collect(Collectors.toList());
        }
    }


}
