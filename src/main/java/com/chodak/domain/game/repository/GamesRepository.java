package com.chodak.domain.game.repository;

import com.chodak.domain.baby.model.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Component
public class GamesRepository {

    private MongoOperations mongoOperations;

    @Autowired
    public GamesRepository(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public List<Game> allGames() {
        Query query = new Query();
        query.with(new Sort(new Sort.Order(Sort.Direction.ASC, "gameDate")));
        return mongoOperations.find(query, Game.class);
    }

    public void createGame(Game game) {
        mongoOperations.insert(game);
    }

    public void updateGame(Game game) {
        mongoOperations.save(game);
    }

    public Optional<Game> byId(String gameId) {
        Query query = new Query(where("id").is(gameId));
        List<Game> games = mongoOperations.find(query, Game.class);
        return games.isEmpty()? Optional.empty() : Optional.of(games.get(0));
    }
}
