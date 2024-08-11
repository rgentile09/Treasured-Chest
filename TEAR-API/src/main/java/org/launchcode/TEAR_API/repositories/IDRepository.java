package org.launchcode.TEAR_API.repositories;

import java.util.List;

import org.launchcode.TEAR_API.models.ID;
import org.launchcode.TEAR_API.models.User;
import org.springframework.data.repository.CrudRepository;

public interface IdRepository extends CrudRepository<ID, Integer> {

    List<ID> findByUser(User user);

    
} 


