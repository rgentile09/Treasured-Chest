package org.launchcode.TEAR_API.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;


@Entity
public class Memory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @NotNull
    private String title;
    @NotNull
    private String date;
    @NotNull
    private String description;

    private String memoryPhoto;

    public Memory() {
    }

    public Memory(User user, String title, String date, String description, String memoryPhoto) {
        this.user = user;
        this.title = title;
        this.date = date;
        this.description = description;
        this.memoryPhoto = memoryPhoto;
    }

    public Memory(String title, String date, String description, String memoryPhoto) {
        this.title = title;
        this.date = date;
        this.description = description;
        this.memoryPhoto = memoryPhoto;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setMemoryPhoto(String memoryPhoto) {
        this.memoryPhoto = memoryPhoto;
    }

    public String getMemoryPhoto() {
        return memoryPhoto;
    }
}
