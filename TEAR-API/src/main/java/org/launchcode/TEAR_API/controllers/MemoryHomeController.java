package org.launchcode.TEAR_API.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemoryHomeController {

    @GetMapping("/")
    public String displayHomePage(){
        return  "index";
    }
}
