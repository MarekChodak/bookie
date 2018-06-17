package com.chodak.domain.baby.model;

import com.chodak.domain.baby.contoller.SaveBetDto;

public class Bet {

    private String userId;

    private Integer scoreA;

    private Integer scoreB;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getScoreA() {
        return scoreA;
    }

    public void setScoreA(Integer scoreA) {
        this.scoreA = scoreA;
    }

    public Integer getScoreB() {
        return scoreB;
    }

    public void setScoreB(Integer scoreB) {
        this.scoreB = scoreB;
    }

    public static Bet createNew(SaveBetDto saveBetDto, String id) {
        Bet bet = new Bet();
        bet.setScoreA(saveBetDto.getScoreA());
        bet.setScoreB(saveBetDto.getScoreB());
        bet.setUserId(id);
        return bet;
    }
}
