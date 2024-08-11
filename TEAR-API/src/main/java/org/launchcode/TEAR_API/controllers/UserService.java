package org.launchcode.TEAR_API.controllers;

import org.launchcode.TEAR_API.models.User;
import org.launchcode.TEAR_API.models.RegisterFormDTO;
import org.launchcode.TEAR_API.models.LoginFormDTO;
import org.launchcode.TEAR_API.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private static final String userSessionKey = "user";
    private static final Logger logger = Logger.getLogger(UserService.class.getName());

    public User getUserFromSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }

        Optional<User> user = userRepository.findById(userId);

        return user.orElse(null);
    }

    public void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    public User registerUser(RegisterFormDTO registerFormDTO) {
        if (registerFormDTO == null || registerFormDTO.getUsername().isEmpty() || registerFormDTO.getPassword().isEmpty()) {
            logger.warning("Invalid registration data");
            return null;
        }

        User existingUser = userRepository.findByUsername(registerFormDTO.getUsername());
        if (existingUser == null) {
            User newUser = new User(registerFormDTO.getUsername(), registerFormDTO.getPassword(), registerFormDTO.getFirstName(), registerFormDTO.getLastName(), registerFormDTO.getEmail());
            try {
                return userRepository.save(newUser);
            } catch (Exception e) {
                logger.severe("Error saving new user: " + e.getMessage());
                return null;
            }
        } else {
            logger.warning("User already exists");
            return null;
        }
    }

    public User loginUser(LoginFormDTO loginFormDTO) {
        if (loginFormDTO == null || loginFormDTO.getUsernameOrEmail().isEmpty() || loginFormDTO.getPassword().isEmpty()) {
            logger.warning("Invalid login data");
            return null;
        }

        User theUser = userRepository.findByUsername(loginFormDTO.getUsernameOrEmail());
        if (theUser == null) {
            theUser = userRepository.findByEmail(loginFormDTO.getUsernameOrEmail());
        }
        if (theUser != null && theUser.isMatchingPassword(loginFormDTO.getPassword())) {
            return theUser;
        } else {
            logger.warning("Invalid username/email or password");
            return null;
        }
    }
}
