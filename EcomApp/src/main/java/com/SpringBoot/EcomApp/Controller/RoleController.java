package com.SpringBoot.EcomApp.Controller;

import com.SpringBoot.EcomApp.Entity.Role;
import com.SpringBoot.EcomApp.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
//import com.fasterxml.jackson.annotation.JsonIgnore;


@RestController
public class RoleController {


    @Autowired
    private RoleService roleService;

    @PostMapping({"/createNewRole"})
    public Role createNewRole(@RequestBody Role role)
    {
        return roleService.createNewRole(role);
    }
}
