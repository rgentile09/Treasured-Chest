package org.launchcode.TEAR_API.models;

import jakarta.persistence.*;

@Entity
public class Memory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String title;
    private String imageUrl;
    private boolean isFirst;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Constructors
    public Memory() {}

    public Memory(String description, String title, String imageUrl, Boolean isFirst, User user) {
        this.description = description;
        this.title = title;
        this.imageUrl = imageUrl;
        this.isFirst = isFirst;
        this.user = user;
    }

    // Getters and Setters
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean getFirst() {
        return isFirst;
    }

    public void setFirst(boolean first) {
        isFirst = first;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
