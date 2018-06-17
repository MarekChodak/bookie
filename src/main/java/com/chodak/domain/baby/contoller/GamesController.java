package com.chodak.domain.baby.contoller;

import com.chodak.domain.baby.model.Baby;
import com.chodak.domain.baby.model.Game;
import com.chodak.domain.baby.model.GameDto;
import com.chodak.domain.baby.model.Measure;
import com.chodak.domain.game.service.GamesService;
import com.chodak.domain.user.model.User;
import com.chodak.domain.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/rest/games")
public class GamesController {

    @Autowired
    private GamesService gamesService;

    @Autowired
    private UserService userService;


    @RequestMapping(value = "/adminGames", method = RequestMethod.GET)
    public List<Game> adminGames(Principal principal){
        verifyAdmin(principal);
        return gamesService.adminGames();
    }

    @RequestMapping(value = "/games", method = RequestMethod.GET)
    public List<GameDto> games(Principal principal){
        return gamesService.games(principal);
    }

    @RequestMapping(value = "/addGame", method = RequestMethod.POST)
    public Game addGame(@RequestBody Game game, Principal principal) {
        verifyAdmin(principal);
        return gamesService.addGame(game);
    }

    @RequestMapping(value = "/saveBet", method = RequestMethod.POST)
    public GameDto saveBet(@RequestBody SaveBetDto saveBetDto, Principal principal) {
        return gamesService.saveBet(saveBetDto, principal);
    }

    @RequestMapping(value = "/updateGame", method = RequestMethod.POST)
    public Game updateGame(@RequestBody Game game, Principal principal) {
        verifyAdmin(principal);
        return gamesService.updateGame(game);
    }

    private void verifyAdmin(Principal principal){
        User user = userService.currentUser(principal.getName());
        if(!user.getRole().equals("ADMIN")){
            throw new RuntimeException("Odwal sie plebsie");
        }
    }
}
