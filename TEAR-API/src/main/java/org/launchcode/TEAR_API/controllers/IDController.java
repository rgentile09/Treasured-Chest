package org.launchcode.TEAR_API.controllers;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.launchcode.TEAR_API.models.ID;
import org.launchcode.TEAR_API.models.User;
import org.launchcode.TEAR_API.repositories.IDRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ID")
public class IDController {
   

    @Autowired
    private IDRepository idRepository;

    @Autowired
    private UserController userController;

    @GetMapping
    public  ResponseEntity<List<ID>> getAllId(HttpSession session) {
        User user = userController.getUserFromSession(session);
        if (user != null) {
            List<ID> ids = idRepository.findByUser(user);
            return ResponseEntity.ok(ids);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            
        }
       }
       @PostMapping("/delete")
         public ResponseEntity<Map<String, String>> deleteId(@RequestParam int idId) {
            Map<String, String> response = new HashMap<>();
            if (idRepository.existsById(idId)) {
                idRepository.deleteById(idId);
                response.put("message", "ID deleted successfully");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "ID not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        }

        @PostMapping("/new")
        public ResponseEntity<Map<String, String>> createId( HttpSession session,@RequestParam String description, @RequestParam String assigned) {

                 User user = userController.getUserFromSession(session);
        Map<String, String> responseBody = new HashMap<>();
        if (user != null) {
            ID newId = new ID();
            newId.setDescription(description);
            newId.setAssigned(assigned);
            newId.setUser(user);
            idRepository.save(newId);
            responseBody.put("message", "ID successfully created");
            return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
        } else {
            responseBody.put("message", "User not found in session");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
        }
    }
}
       
