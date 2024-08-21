package org.launchcode.TEAR_API.models;

import jakarta.persistence.*;

@Entity
public class Questionnaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String favoriteFood;
    private String vacation;
    private String growth;
    private String summary;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "child_id")
    private Child child;

    // Getters and Setters

    public Questionnaire(String favoriteFood, String vacation, String growth, String summary, User user, Child child) {
    this.favoriteFood = favoriteFood;
    this.vacation = vacation;
    this.growth = growth;
    this.summary = summary;
    this.user = user;
    this.child = child;
}
public Questionnaire() {
    
}

    public String getFavoriteFood() {
       return favoriteFood;
    }

    public void setFavoriteFood(String favoriteFood) {
        this.favoriteFood = favoriteFood;
    }

    public String getVacation() {
        return vacation;
    }

    public void setVacation(String vacation) {
        this.vacation = vacation;
    }

    public String getGrowth() {
        return growth;
    }

    public void setGrowth(String growth) {
        this.growth = growth;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Child getChild() {
        return child;
    }

    public void setChild(Child child) {
        this.child = child;
    }
}
