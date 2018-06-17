package com.chodak.domain.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;

@Controller
public class UserControllerTemp {


    @RequestMapping("/")
    public String handleRequest2(ModelMap map) {
        map.addAttribute("time", LocalDateTime.now().toString());
        return "index";
    }
}
