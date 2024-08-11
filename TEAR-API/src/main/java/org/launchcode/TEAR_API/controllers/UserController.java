package org.launchcode.TEAR_API.controllers;

import org.launchcode.TEAR_API.models.LoginFormDTO;
import org.launchcode.TEAR_API.models.RegisterFormDTO;
import org.launchcode.TEAR_API.models.User;
import org.launchcode.TEAR_API.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

@Autowired
UserRepository userRepository;

private static final String userSessionKey = "user";

public User getUserFromSession(HttpSession session) {
    Integer userId = (Integer) session.getAttribute(userSessionKey);
    if (userId == null) {
        return null;
    }

    Optional<User> user = userRepository.findById(userId);

    if (user.isEmpty()) {
        return null;
    }

    return user.get();

}

private static void setUserInSession(HttpSession session, User user) {
    session.setAttribute(userSessionKey, user.getId());
}

@PostMapping(value= "/create-account" )
public ResponseEntity<Map<String, String>> processRegistrationForm(@RequestBody RegisterFormDTO registerFormDTO,
                                                                   HttpServletRequest request) {
    ResponseEntity<Map<String, String>> response = null;  
    Map<String, String> responseBody = new HashMap<>(); 
  try {
    User existingUser = userRepository.findByUsername(registerFormDTO.getUsername());
    if (existingUser == null && !registerFormDTO.getUsername().isEmpty() && !registerFormDTO.getPassword().isEmpty()) {
       User newUser = new User(registerFormDTO.getUsername(), registerFormDTO.getPassword(), registerFormDTO.getFirstName(), registerFormDTO.getLastName(), registerFormDTO.getEmail());
       userRepository.save(newUser);  
       setUserInSession(request.getSession(), newUser);
         responseBody.put("message", "User successfully created.");
            response = ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(responseBody);
       
      } else if (existingUser != null) {
        responseBody.put("message", "User Already Exists.");
        response = ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(responseBody);
    } else if (registerFormDTO.getUsername().isEmpty()) {
        responseBody.put("message", "Username required.");
        response = ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(responseBody);
    } else if (registerFormDTO.getPassword().isEmpty()) {
        responseBody.put("message", "Password required");
        response = ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(responseBody);
    }   

} catch (Exception ex) {
            responseBody.put("message", "An exception occurred due to " + ex.getMessage());
            response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(responseBody);
        }
        return response;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> processLoginForm(@RequestBody LoginFormDTO loginFormDTO, HttpServletRequest request) {

        ResponseEntity<Map<String, String>> response = null;
        Map<String, String> responseBody = new HashMap<>();
        User theUser = userRepository.findByUsername(loginFormDTO.getUsername());
        String password = loginFormDTO.getPassword();
        if (theUser == null) {
            responseBody.put("message", "Username does not exist");
            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(responseBody);
        } else if (!theUser.isMatchingPassword(password)) {
            responseBody.put("message", "Password does not match");
            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(responseBody);
        } else {
            setUserInSession(request.getSession(), theUser);
            responseBody.put("message", "User successfully logged in.");
            responseBody.put("username", theUser.getUsername());
            responseBody.put("userRole", theUser.getRole());
            response = ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(responseBody);
        }
        return response;
    }

    @GetMapping("/logout")
public String logout(HttpServletRequest request) {
    request.getSession().invalidate();
  

    return "redirect:/login";
}
        
    }

