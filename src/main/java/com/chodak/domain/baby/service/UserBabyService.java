package com.chodak.domain.baby.service;

import com.chodak.domain.baby.model.Baby;
import com.chodak.domain.baby.model.Measure;
import com.chodak.domain.baby.model.Measures;
import com.chodak.domain.baby.repository.BabyRepository;
import com.chodak.domain.baby.repository.MeasuresRepository;
import com.chodak.domain.file.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

/**
 * Created by marekchodak on 04/02/17.
 */
@Service
public class UserBabyService {

    public static final String USER_ID = "test";

    @Autowired
    private BabyRepository babyRepository;

    @Autowired
    private MeasuresRepository measuresRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public Optional<Baby> userBaby() {
        return babyRepository.userBaby(USER_ID);
    }

    public void createBaby(Baby baby, MultipartFile file) {
        baby.setUserId(USER_ID);
        babyRepository.createBaby(baby);
        fileStorageService.storeFile(file, baby.getId());
    }

    public byte[] userBabyPhoto() {
        Optional<Baby> baby = userBaby();
        if(baby.isPresent()){
            return fileStorageService.file(baby.get().getId());
        } else {
            return null;
        }
    }

    public List<Measure> userBabyMeasures() {
        return babyMeasures().measures();
    }

    private Measures babyMeasures(){
        Optional<Baby> baby = userBaby();
        if(baby.isPresent()){
            Optional<Measures> measures = measuresRepository.babyMeasures(baby.get().getId());
            if(measures.isPresent()){
                return measures.get();
            } else {
                Measures measure = createMeasures(baby.get().getId());
                return measure;
            }
        }
        throw new RuntimeException("No Baby created");
    }

    private Measures createMeasures(String babyId) {
        Measures measures = new Measures();
        measures.setBabyId(babyId);
        measures.initiliazeMeasures();
        measuresRepository.createMeasures(measures);
        return measures;
    }

    public Measure addBabyMeasure(Measure measure) {
        Measures measures = babyMeasures();
        measures.addMeasure(measure);
        measuresRepository.update(measures);
        return measure;
    }
}
