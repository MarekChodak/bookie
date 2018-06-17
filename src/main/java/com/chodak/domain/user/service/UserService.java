package com.chodak.domain.user.service;

import com.chodak.domain.baby.model.Game;
import com.chodak.domain.user.model.User;
import com.chodak.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User currentUserInfo(String name) {
        return userRepository.byUsername(name).get().toDto();
    }

    public List<User> allUsers() {
        List<User> users = userRepository.all();
        return users.stream().map(user -> user.toDto()).collect(Collectors.toList());
    }

    public User currentUser(String name) {
        return userRepository.byUsername(name).get();
    }

    public User addUser(User user) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.addUser(user).toDto();
    }
}
