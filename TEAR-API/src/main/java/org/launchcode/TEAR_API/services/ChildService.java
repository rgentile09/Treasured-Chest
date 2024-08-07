package org.launchcode.TEAR_API.services;

import org.launchcode.TEAR_API.models.Child;
import org.launchcode.TEAR_API.repositories.ChildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ChildService {
    @Autowired
    private ChildRepository childRepository;

    public Child save(Child child) {
        return childRepository.save(child);
    }
    public List<Child> findByUserId(Long userId) {
        return childRepository.findByUserId(userId);
    }
}
