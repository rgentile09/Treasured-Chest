package org.launchcode.TEAR_API.repositories;

import java.util.List;

import org.launchcode.TEAR_API.models.ID;
import org.launchcode.TEAR_API.models.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IDRepository extends CrudRepository<ID, Integer> {

    List<ID> findByUser(User user);

    void save(Id newId);

    
} 


