package org.launchcode.TEAR_API.controllers;

import org.launchcode.TEAR_API.models.Child;
import org.launchcode.TEAR_API.repositories.ChildRepository;
import org.launchcode.TEAR_API.services.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/children")
public class ChildController {
    @Autowired
    private ChildService childService;
    @Autowired
    private ChildRepository childRepository;

    @PostMapping
    public Child addChild(@RequestBody Child child) {
        return childService.save(child);
    }

    @GetMapping("/user/{userId}")
    public List<Child> getChildrenByUserId(@PathVariable Long userId) {
        return childService.findByUserId(userId);
    }

    @DeleteMapping("/delete")
    public void deleteChild(@RequestParam Long id) {
        childRepository.deleteById(id);
    }
    @PatchMapping("/update/{id}")
    public Child updateChild (@RequestParam Long id, String firstName, @RequestParam String birthDate, @RequestParam(required = false) String childPhoto) {
        Child updateChild = childRepository.findById(id).get();
        updateChild.setFirstName(firstName);
        updateChild.setBirthDate(birthDate);
        if (childPhoto != null) {
            updateChild.setChildPhoto(childPhoto);
        }
        return childRepository.save(updateChild);
    }

}
