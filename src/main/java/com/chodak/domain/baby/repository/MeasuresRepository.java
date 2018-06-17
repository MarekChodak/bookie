package com.chodak.domain.baby.repository;

import com.chodak.domain.baby.model.Measures;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.query.Criteria.where;

/**
 * Created by marekchodak on 05/03/17.
 */
@Component
public class MeasuresRepository {

    private final MongoOperations mongoOperations;

    @Autowired
    public MeasuresRepository(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public Optional<Measures> babyMeasures(String userId) {
        Query query = new Query(where("babyId").is(userId));
        List<Measures> babies = mongoOperations.find(query, Measures.class);
        return babies.isEmpty()? Optional.empty() : Optional.of(babies.get(0));
    }

    public void createMeasures(Measures measures) {
        mongoOperations.insert(measures);
    }

    public void update(Measures measures) {
        mongoOperations.save(measures);
    }
}
