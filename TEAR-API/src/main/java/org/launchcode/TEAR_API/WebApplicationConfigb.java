package org.launchcode.TEAR_API;


import org.launchcode.TEAR_API.SecurityConfig.AuthentificationFilter;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class WebApplicationConfigb implements WebMvcConfigurer {
 
@Bean
public HandlerInterceptor authenticationFilter() {
    return (HandlerInterceptor) new AuthentificationFilter();
}
            @Override
            public void addInterceptors(InterceptorRegistry registry) {
                registry.addInterceptor(authenticationFilter()).addPathPatterns("/memories/**").addPathPatterns("/children/**").excludePathPatterns("/create-account").excludePathPatterns("/login").excludePathPatterns("/logout");
                 {
            }}
            
} 