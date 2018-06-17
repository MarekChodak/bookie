package com.chodak.domain.game.service;

import com.chodak.domain.baby.contoller.SaveBetDto;
import com.chodak.domain.baby.model.Bet;
import com.chodak.domain.baby.model.Game;
import com.chodak.domain.baby.model.GameDto;
import com.chodak.domain.game.repository.GamesRepository;
import com.chodak.domain.user.model.User;
import com.chodak.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GamesService {

    @Autowired
    private GamesRepository gamesRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Game> adminGames() {
        return gamesRepository.allGames();
    }

    public List<GameDto> games(Principal principal) {
        User user = userRepository.byUsername(principal.getName()).get();
        List<Game> games = gamesRepository.allGames();
        return games.stream()
                .map(game -> game.toDto(user.getId()))
                .map(this::toDto).collect(Collectors.toList());
    }

    private GameDto toDto(Game game) {
        GameDto gameDto = new GameDto();
        gameDto.setId(game.getId());
        gameDto.setTeamA(game.getTeamA());
        gameDto.setTeamB(game.getTeamB());
        gameDto.setScoreA(game.getScoreA());
        gameDto.setScoreB(game.getScoreB());
        gameDto.setGameDate(game.getGameDate());
        gameDto.setBettingAllowed(game.isBettingAllowed());
        if(game.getBets() == null){
            gameDto.setBets(new ArrayList<>());
        } else {
            gameDto.setBets(game.getBets().stream().map(this::toDto).collect(Collectors.toList()));
        }
        return gameDto;
    }

    private BetDto toDto(Bet bet) {
        BetDto betDto = new BetDto();
        betDto.setScoreA(bet.getScoreA());
        betDto.setScoreB(bet.getScoreB());
        betDto.setUser(userRepository.byId(bet.getUserId()).get().getUsername());
        return betDto;
    }

    public Game addGame(Game game) {
        game.setBets(new ArrayList<>());
        gamesRepository.createGame(game);
        return game;
    }

    public Game updateGame(Game game) {
        gamesRepository.updateGame(game);
        return game;
    }

    public GameDto saveBet(SaveBetDto saveBetDto, Principal principal) {
        User user = userRepository.byUsername(principal.getName()).get();
        Game game = gamesRepository.byId(saveBetDto.getGameId()).get();
        if(!game.isBettingAllowed()){
            throw new RuntimeException("Too late");
        }
        Optional<Bet> bet = game.betForUser(user.getId());
        if(bet.isPresent()){
            Bet bet1 = bet.get();
            bet1.setScoreA(saveBetDto.getScoreA());
            bet1.setScoreB(saveBetDto.getScoreB());
        } else {
            if(game.getBets() == null){
                game.setBets(new ArrayList<>());
            }
            game.getBets().add(Bet.createNew(saveBetDto, user.getId()));
        }
        gamesRepository.updateGame(game);
        return toDto(game.toDto(user.getId()));
    }
}
