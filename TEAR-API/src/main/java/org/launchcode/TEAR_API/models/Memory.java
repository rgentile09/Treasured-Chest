package org.launchcode.TEAR_API.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class Memory extends AbstractEntity {
    @ManyToOne
    @JoinColumn(name = "child_id")
    private Child child;

    private String title;

    private String date;

    private String description;

    private String memoryPhoto;

    public Memory() {
    }

    public Memory(Child child, String title, String date, String description, String memoryPhoto) {
        this.child = child;
        this.title = title;
        this.date = date;
        this.description = description;
        this.memoryPhoto = memoryPhoto;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMemoryPhoto() {
        return memoryPhoto;
    }

    public Child getChild() {
        return child;
    }

    public void setChild(Child child) {
        this.child = child;
    }
}
