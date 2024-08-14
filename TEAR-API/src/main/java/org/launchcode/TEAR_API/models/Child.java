package org.launchcode.TEAR_API.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
public class Child {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    private String firstName;
    @Column
    @NotNull
    private String birthDate;
    @Column
    private String childPhoto;

    // No-argument constructor
    public Child() {
    }


    // Parameterized constructor
    public Child(String firstName, String birthDate, String childPhoto) {
        this.firstName = firstName;
        this.birthDate = birthDate;
        this.childPhoto = childPhoto;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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