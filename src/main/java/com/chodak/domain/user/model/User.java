package com.chodak.domain.user.model;

import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

/**
 * Created by marekchodak on 05/08/16.
 */
public class User implements Serializable {

    @Id
    private String id;

    private String username;

    private String password;

    private String role;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User toDto() {
        User user = new User();
        user.setUsername(username);
        user.setRole(role);
        return user;
    }
}
