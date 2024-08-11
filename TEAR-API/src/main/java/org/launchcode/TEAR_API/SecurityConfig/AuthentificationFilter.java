package org.launchcode.TEAR_API.SecurityConfig;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.launchcode.TEAR_API.controllers.UserController;
import org.launchcode.TEAR_API.models.User;
import org.launchcode.TEAR_API.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class AuthentificationFilter implements HandlerInterceptor {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserController userController;

    private static final List<String> WHITELIST = Arrays.asList("/login", "/register", "/logout");

    private static boolean isWhitelisted(String path) {
        for (String pathRoot : WHITELIST) {
            if (path.startsWith(pathRoot)) {
                return true;
            }
        }
        return false;
    }
    
     @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        if (isWhitelisted(request.getRequestURI())) {
            return true;
        }

        HttpSession session = request.getSession();
        User user = userController.getUserFromSession(session);

        if (user != null) {
            return true;
        }

        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return true;
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
    }}


      

