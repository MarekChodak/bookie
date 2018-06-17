package com.chodak.domain.baby.model;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by marekchodak on 05/03/17.
 */
public class Measures {

    @Id
    private String id;

    private String babyId;

    private List<Measure> measures;

    public List<Measure> measures(){
        return measures;
    }

    public void setBabyId(String babyId) {
        this.babyId = babyId;
    }

    public void initiliazeMeasures(){
        measures = new ArrayList<>();
    }

    public void addMeasure(Measure measure) {
        setupMeasureId(measure);
        this.measures.add(measure);
    }

    private void setupMeasureId(Measure measure) {
        if(measures.isEmpty()){
            measure.setId(0);
        } else {
            int id = measures.get(measures.size()-1).getId();
            measure.setId(id);
        }
    }
}
