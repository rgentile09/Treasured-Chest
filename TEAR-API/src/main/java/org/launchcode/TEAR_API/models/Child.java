package org.launchcode.TEAR_API.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.util.Date;

@Entity
public class Child extends AbstractEntity{

    private String firstName;
    private String birthDate;
    private String childPhoto;

    public Child() {
    }

    public Child(String firstName, String birthDate) {
        this.firstName = firstName;
        this.birthDate = birthDate;
    }

    public Child(String firstName, String birthDate, String childPhoto) {
        this.firstName = firstName;
        this.birthDate = birthDate;
        this.childPhoto = childPhoto;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getChildPhoto() {
        return childPhoto;
    }

    public void setChildPhoto(String childPhoto) {
        this.childPhoto = childPhoto;
    }
}