package com.chodak.domain.baby.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class WebAppConfig extends WebSecurityConfigurerAdapter{

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .anyRequest()//allow all urls
                .authenticated()//all URLs are allowed by any authenticated user, no role restrictions.
                .and()
                .csrf().disable()
                .formLogin()//enable form based authentication
                .loginPage("/my-login")
                .loginProcessingUrl("/login").usernameParameter("username")
                .passwordParameter("password")
                .permitAll(true)//login URI can be accessed by anyone
                .and()
                .logout()//default logout handling
                .logoutSuccessUrl("/my-login?logout")//our new logout success url, we are not replacing other defaults.
                .permitAll();//allow all as it will be accessed when user is not logged in anymore
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailsService).passwordEncoder(bCryptPasswordEncoder());
    }

    @Bean
    public WebMvcConfigurerAdapter forwardToIndex() {
        return new WebMvcConfigurerAdapter() {

            @Override
            public void addViewControllers(ViewControllerRegistry registry) {
                registry.addViewController("/dashboard").setViewName(
                        "forward:/index.html");
                registry.addViewController("/users").setViewName(
                        "forward:/index.html");
                registry.addViewController("/games").setViewName(
                        "forward:/index.html");
                registry.addViewController("/index").setViewName(
                        "forward:/index.html");
                registry.addViewController("/").setViewName(
                        "index.html");
                registry.addViewController("/my-login").setViewName(
                        "forward:/my-login.html");
            }
        };
    }

}
