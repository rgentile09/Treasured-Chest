package org.launchcode.TEAR_API.repositories;

import org.launchcode.TEAR_API.models.Memory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemoryRepository extends CrudRepository<Memory, Long> {
    List<Memory> findByChildId(Long childId);
}
