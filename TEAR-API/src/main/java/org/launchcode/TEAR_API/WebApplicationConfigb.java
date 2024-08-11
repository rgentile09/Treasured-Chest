package org.launchcode.TEAR_API;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class WebApplicationConfigb implements WebMvcConfigurer {
 
@Bean
    public AuthenticationFilter authenticationFilter() {
        return new AuthenticationFilter();
    }
            @Override
            public void addInterceptors(InterceptorRegistry registry) {
                registry.addInterceptor(authenticationFilter() );
                 {
            }}
            
 