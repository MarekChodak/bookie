package com.chodak.domain.file.service;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created by marekchodak on 25/02/17.
 */
@Service
public class FileStorageService {

    private static final String PHOTS_PATH = "/Users/marekchodak/development/files/baby/profile/";

    public String storeFile(MultipartFile file, String babyId) {
        String pathname = babyPhotoFilePath(babyId);
        File outputFile = new File(pathname);
        try {
            FileOutputStream fileOutputStream = new FileOutputStream(outputFile);
            fileOutputStream.write(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Could not sore the file", e);
        }
        return pathname;
    }

    public byte[] file(String babyId) {
        String filePath = babyPhotoFilePath(babyId);
        try {
            FileInputStream is = new FileInputStream(new File(filePath));
            return IOUtils.toByteArray(is);
        } catch (IOException e) {
            throw new RuntimeException("Could not read the file", e);
        }
    }

    private String babyPhotoFilePath(String babyId) {
        return PHOTS_PATH + babyId + ".jpg";
    }

}
