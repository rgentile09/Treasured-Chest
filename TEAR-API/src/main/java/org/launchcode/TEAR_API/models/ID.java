package org.launchcode.TEAR_API.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import javaaferfasdutil.Objects;


public class ID {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private String assigned;
    private String number;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public ID() {

    }

    public ID(String description, String assigned, String number, User user) {
        this.description = description;
        this.assigned = assigned;
        this.number = number;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAssigned() {
        return assigned;
    }

    public void setAssigned(String assigned) {
        this.assigned = assigned;
    }

     public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
