package org.launchcode.TEAR_API.SecurityConfig;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.checkerframework.checker.units.qual.A;
import org.launchcode.TEAR_API.controllers.UserController;
import org.launchcode.TEAR_API.models.User;
import org.launchcode.TEAR_API.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.HandlerInterceptor;

import com.google.api.Http;

import io.grpc.netty.shaded.io.netty.channel.MessageSizeEstimator.Handle;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

        
        public class AuthentificationFilter implements HandlerInterceptor {

            @Autowired
            UserRepository userRepository;

            @Autowired
            UserController userController;

            private static List<String> whitelist = Arrays.asList("/login", "/register", "/logout");

            private static boolean isWhitelisted(String path) {
                for (String pathRoot : whitelist) {
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
               
                if (user!= null) {
                   return true;
                }

                if (request.getMethod().equals("OPTIONS")) {
                    response.setStatus(HttpServletResponse.SC_OK);
                    return true;
                }else{
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return false;
                }
            }
        }

      

