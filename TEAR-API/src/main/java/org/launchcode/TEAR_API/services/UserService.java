package org.launchcode.TEAR_API.services;

import org.launchcode.TEAR_API.models.Child;
import org.launchcode.TEAR_API.models.User;
import org.launchcode.TEAR_API.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User addUser(String userName) {
        User user = userRepository.findByUsername(userName);
        return userRepository.save(user);
    }
}
