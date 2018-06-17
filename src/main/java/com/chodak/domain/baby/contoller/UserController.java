package com.chodak.domain.baby.contoller;

import com.chodak.domain.user.model.User;
import com.chodak.domain.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/rest/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/info", method = RequestMethod.GET)
    public User user(Principal principal){
        return userService.currentUserInfo(principal.getName());
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<User> allUsers(Principal principal){
        verifyAdmin(principal);
        return userService.allUsers();
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public User addUser(@RequestBody User game, Principal principal) {
        verifyAdmin(principal);
        game.setRole("USER");
        return userService.addUser(game);
    }

    private void verifyAdmin(Principal principal){
        User user = userService.currentUser(principal.getName());
        if(!user.getRole().equals("ADMIN")){
            throw new RuntimeException("Odwal sie plebsie");
        }
    }
}
