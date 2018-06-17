package com.chodak.domain.baby.model;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class Game {

    @Id
    private String id;

    private String teamA;

    private String teamB;

    private Date gameDate;

    private Integer scoreA;

    private Integer scoreB;

    private List<Bet> bets;

    public List<Bet> getBets() {
        return bets;
    }

    public void setBets(List<Bet> bets) {
        this.bets = bets;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTeamA() {
        return teamA;
    }

    public void setTeamA(String teamA) {
        this.teamA = teamA;
    }

    public String getTeamB() {
        return teamB;
    }

    public void setTeamB(String teamB) {
        this.teamB = teamB;
    }

    public Date getGameDate() {
        return gameDate;
    }

    public void setGameDate(Date gameDate) {
        this.gameDate = gameDate;
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

    public Game toDto(String userId){
        Game gameDto = new Game();
        gameDto.setId(getId());
        gameDto.setTeamA(getTeamA());
        gameDto.setTeamB(getTeamB());
        gameDto.setScoreA(getScoreA());
        gameDto.setScoreB(getScoreB());
        gameDto.setGameDate(getGameDate());
        boolean bettingAllowed = isBettingAllowed();
        List<Bet> bets;
        if(bettingAllowed && getBets() != null){
            bets = getBets().stream().filter(bet -> bet.getUserId().equals(userId)).collect(Collectors.toList());
        } else {
            bets = getBets();
        }
        if(bets == null){
            bets = new ArrayList<>();
        }
        gameDto.setBets(bets);
        return gameDto;
    }

    public boolean isBettingAllowed() {
        return getGameDate().after(new Date());
    }

    public Optional<Bet> betForUser(String id) {
        if(getBets() == null){
            return Optional.empty();
        }
        return getBets().stream().filter(bet -> bet.getUserId().equals(id)).findFirst();
    }
}
