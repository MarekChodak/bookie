package com.chodak.domain.baby.repository;

import com.chodak.domain.baby.model.Baby;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.query.Criteria.where;

/**
 * Created by marekchodak on 04/02/17.
 */
@Component
public class MongoBabyRepository implements BabyRepository {

    private final MongoOperations mongoOperations;

    @Autowired
    public MongoBabyRepository(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    @Override
    public Optional<Baby> userBaby(String userId) {
        Query query = new Query(where("userId").is(userId));
        List<Baby> babies = mongoOperations.find(query, Baby.class);
        return babies.isEmpty()? Optional.empty() : Optional.of(babies.get(0));
    }

    @Override
    public void createBaby(Baby baby) {
        mongoOperations.insert(baby);
    }
}
