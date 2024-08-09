package org.launchcode.TEAR_API.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
public class Child extends AbstractEntity{
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @Column
    @NotNull
    private String firstName;
    @Column
    @NotNull
    private String birthDate;
    @Column
    private String childPhoto;

    public Child() {
    }

    public Child(User user) {
        this.user = user;
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
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}