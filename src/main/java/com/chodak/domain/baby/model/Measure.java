package com.chodak.domain.baby.model;

import org.springframework.data.annotation.Id;

import java.util.Date;

/**
 * Created by marekchodak on 05/03/17.
 */
public class Measure {

    private int id;

    private double weight;

    private double height;

    private Date measureDate;

    public double getWeight() {
        return weight;
    }

    public double getHeight() {
        return height;
    }

    public Date getMeasureDate() {
        return measureDate;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public void setMeasureDate(Date measureDate) {
        this.measureDate = measureDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
