package com.chodak.domain.user.repository;

import com.chodak.domain.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Component
public class UserRepository {

    private MongoOperations mongoOperations;

    @Autowired
    public UserRepository(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public Optional<User> byUsername(String username) {
        Query query = new Query(where("username").is(username));
        List<User> babies = mongoOperations.find(query, User.class);
        return babies.isEmpty()? Optional.empty() : Optional.of(babies.get(0));
    }

    public Optional<User> byId(String id) {
        Query query = new Query(where("id").is(id));
        List<User> babies = mongoOperations.find(query, User.class);
        return babies.isEmpty()? Optional.empty() : Optional.of(babies.get(0));
    }

    public List<User> all() {
        Query query = new Query();
        return mongoOperations.find(query, User.class);
    }

    public User addUser(User user) {
        mongoOperations.insert(user);
        return user;
    }
}
