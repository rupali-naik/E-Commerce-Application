package com.SpringBoot.EcomApp.DAO;

import com.SpringBoot.EcomApp.Entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDao extends CrudRepository<Product,Integer> {

    public List<Product> findAll(Pageable pageable);
    public List<Product> findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(String key1,String key2,Pageable pageable);

    //findByProductNameContainingIgnoreOrProductDescriptionContainingIgnore :- this is used so that query is implemented in sql
    //Containing:- works similar to like operator
    //IgnoreCase: ignores case
    // Or: will match key in product name and product description
   //ProductName , ProductDescription: variable name as mentioned in entity class
    //key1: for ProductName
    //key2: ProductDescription
    //pageable: to fetch products in batches of 8 products, if there are many products
}
