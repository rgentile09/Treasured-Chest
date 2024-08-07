package org.launchcode.TEAR_API.repositories;

import org.launchcode.TEAR_API.models.Child;
import org.launchcode.TEAR_API.models.Memory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChildRepository extends CrudRepository<Child, Long> {
    List<Child> findByUserId(Long userId);
}
