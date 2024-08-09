package org.launchcode.TEAR_API.SecurityConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

        @Configuration
        public class SecurityConfig {

            private final UserDetailsService userDetailsService;

            public SecurityConfig(UserDetailsService userDetailsService) {
                this.userDetailsService = userDetailsService;
            }

            @Bean
            public JwtTokenFilter jwtTokenFilter() {
                return new JwtTokenFilter(userDetailsService);
            }

            @Bean
            public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                        .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class)
                        .authorizeRequests(authorizeRequests -> authorizeRequests
                                .requestMatchers("/api/login", "/api/create-account").permitAll()
                                .anyRequest().authenticated())
                        .csrf(csrf -> csrf.disable())
                        .sessionManagement(sessionManagement ->
                                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

                return http.build();
            }
        }

