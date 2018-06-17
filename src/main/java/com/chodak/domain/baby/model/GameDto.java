package com.chodak.domain.baby.model;

import com.chodak.domain.game.service.BetDto;

import java.util.Date;
import java.util.List;

public class GameDto {
    private String teamA;
    private String teamB;
    private Integer scoreA;
    private Integer scoreB;
    private Date gameDate;
    private List<BetDto> bets;
    private boolean bettingAllowed;
    private String id;

    public void setTeamA(String teamA) {
        this.teamA = teamA;
    }

    public String getTeamA() {
        return teamA;
    }

    public void setTeamB(String teamB) {
        this.teamB = teamB;
    }

    public String getTeamB() {
        return teamB;
    }

    public void setScoreA(Integer scoreA) {
        this.scoreA = scoreA;
    }

    public Integer getScoreA() {
        return scoreA;
    }

    public void setScoreB(Integer scoreB) {
        this.scoreB = scoreB;
    }

    public Integer getScoreB() {
        return scoreB;
    }

    public void setGameDate(Date gameDate) {
        this.gameDate = gameDate;
    }

    public Date getGameDate() {
        return gameDate;
    }

    public List<BetDto> getBets() {
        return bets;
    }

    public void setBets(List<BetDto> bets) {
        this.bets = bets;
    }

    public boolean isBettingAllowed() {
        return bettingAllowed;
    }

    public void setBettingAllowed(boolean bettingAllowed) {
        this.bettingAllowed = bettingAllowed;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}
