package org.launchcode.TEAR_API.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Child extends AbstractEntity{
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @Column
    private String firstName;
    @Column
    private String birthDate;
    @Column
    private String childPhoto;
    @OneToMany(mappedBy = "child")
    private List<Memory> memories;

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

    public Child(String firstName, String birthDate, String childPhoto, List<Memory> memories) {
        this.firstName = firstName;
        this.birthDate = birthDate;
        this.childPhoto = childPhoto;
        this.memories = memories;
    }

    public Child(User user, String firstName, String birthDate, String childPhoto, List<Memory> memories) {
        this.user = user;
        this.firstName = firstName;
        this.birthDate = birthDate;
        this.childPhoto = childPhoto;
        this.memories = memories;
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

    public List<Memory> getMemories() {
        return memories;
    }

    public void setMemories(List<Memory> memories) {
        this.memories = memories;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}