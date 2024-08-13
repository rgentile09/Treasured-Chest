package org.launchcode.TEAR_API.controllers;

import org.launchcode.TEAR_API.models.Child;
import org.launchcode.TEAR_API.repositories.ChildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ChildController {
    @Autowired
    private ChildRepository childRepository;

    @GetMapping("")
    public List<Child> getAllChildren() {
        return (List<Child>) childRepository.findAll();
    }
    @PostMapping("/add")
    public Child addChild(@RequestParam String firstName, @RequestParam String birthDate, @RequestParam(required = false) String childPhoto) {
        Child newChild = new Child();
        newChild.setFirstName(firstName);
        newChild.setBirthDate(birthDate);
       if (childPhoto != null) {
           newChild.setChildPhoto(childPhoto);
       }
        return childRepository.save(newChild);
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
