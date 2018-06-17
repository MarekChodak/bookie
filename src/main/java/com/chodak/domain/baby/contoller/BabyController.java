package com.chodak.domain.baby.contoller;

import com.chodak.domain.baby.model.Baby;
import com.chodak.domain.baby.model.Measure;
import com.chodak.domain.baby.service.UserBabyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Created by marekchodak on 04/02/17.
 */
@RestController
@RequestMapping("/rest/baby")
public class BabyController {

    @Autowired
    private UserBabyService userBabyService;

    @RequestMapping(value = "/my", method = RequestMethod.GET)
    public Baby userBaby(){
        Baby baby = new Baby();
        return userBabyService.userBaby().orElse(baby);
    }

    @RequestMapping(value = "/babyPicture", method = RequestMethod.POST)
    public void uploadBabyPicture(@RequestParam("file") MultipartFile file,
                            @RequestParam("firstName") String firstName,
                            @RequestParam("lastName") String lastName,
                            @RequestParam("birthDate") String birthDate){
        Baby baby = new Baby();
        baby.setFirstName(firstName);
        baby.setLastName(lastName);
        baby.setBirthDate(LocalDate.parse(birthDate, DateTimeFormatter.BASIC_ISO_DATE));
        userBabyService.createBaby(baby, file);
    }

    @RequestMapping(value = "/myBabyPicture", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] babyPicture(){
        return userBabyService.userBabyPhoto();
    }

    @RequestMapping(value = "/myBabyMeasures", method = RequestMethod.GET)
    public List<Measure> babyMeasures(){
        return userBabyService.userBabyMeasures();
    }

    @RequestMapping(value = "/addMeasure", method = RequestMethod.POST)
    public Measure addMeasure(@RequestBody Measure measure){
        return userBabyService.addBabyMeasure(measure);
    }
}
