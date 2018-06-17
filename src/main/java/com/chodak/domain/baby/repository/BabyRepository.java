package com.chodak.domain.baby.repository;

import com.chodak.domain.baby.model.Baby;

import java.util.Optional;

/**
 * Created by marekchodak on 04/02/17.
 */
public interface BabyRepository {

    Optional<Baby> userBaby(String userId);

    void createBaby(Baby baby);

}
