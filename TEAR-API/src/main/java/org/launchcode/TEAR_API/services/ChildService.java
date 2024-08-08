package org.launchcode.TEAR_API.services;

import org.launchcode.TEAR_API.models.Child;
import org.launchcode.TEAR_API.models.User;
import org.launchcode.TEAR_API.repositories.ChildRepository;
import org.launchcode.TEAR_API.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChildService {
    @Autowired
    private ChildRepository childRepository;

    @Autowired
    UserRepository userRepository;

    public Child addChild(Long userId, Child child) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        child.setUser(user);
        return childRepository.save(child);
    }
    public List<Child> findByUserId(Long userId) {
        return childRepository.findByUserId(userId);
    }
}
