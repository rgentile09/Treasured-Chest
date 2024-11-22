package org.launchcode.TEAR_API.controllers;

import org.launchcode.TEAR_API.models.LoginFormDTO;
import org.launchcode.TEAR_API.models.RegisterFormDTO;
import org.launchcode.TEAR_API.models.User;
import org.launchcode.TEAR_API.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "https://treasured-chest.netlify.app", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private static final String userSessionKey = "user";

    public User getUserFromSession(HttpSession session) {
        Long userId = (Long) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }
        return userRepository.findById(userId).orElse(null);
    }

    private void setUserInSession(HttpSession session, User user) {
        if (user != null) {
            session.setAttribute(userSessionKey, user.getId());
        } else {
            throw new IllegalArgumentException("User cannot be null");
        }
    }

    @PostMapping("/create-account")
    public ResponseEntity<Map<String, String>> processRegistrationForm(@RequestBody RegisterFormDTO registerFormDTO,
                                                                       HttpServletRequest request) {
        Map<String, String> responseBody = new HashMap<>();
        try {
            if (registerFormDTO.getUsername().isEmpty()) {
                responseBody.put("message", "Username required.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
            }
            if (registerFormDTO.getPassword().isEmpty()) {
                responseBody.put("message", "Password is required.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
            }

            User existingUser = userRepository.findByUsername(registerFormDTO.getUsername());
            if (existingUser != null) {
                responseBody.put("message", "Username already exists.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
            }

            User newUser = new User(registerFormDTO.getUsername(), registerFormDTO.getPassword(),
                                    registerFormDTO.getFirstName(), registerFormDTO.getLastName(),
                                    registerFormDTO.getEmail());
            userRepository.save(newUser);
            setUserInSession(request.getSession(), newUser);

            responseBody.put("message", "User successfully created.");
            return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);

        } catch (Exception ex) {
            responseBody.put("message", "An error occurred: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> processLoginForm(@RequestBody LoginFormDTO loginFormDTO,
                                                                 HttpServletRequest request) {
        Map<String, String> responseBody = new HashMap<>();
        User user = userRepository.findByUsername(loginFormDTO.getUsername());

        if (user == null) {
            responseBody.put("message", "Username does not exist.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }

        if (!user.isMatchingPassword(loginFormDTO.getPassword())) {
            responseBody.put("message", "Incorrect password.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }

        setUserInSession(request.getSession(), user);
        responseBody.put("message", "User successfully logged in.");
        responseBody.put("username", user.getUsername());

        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return ResponseEntity.ok("Successfully logged out.");
    }
}


