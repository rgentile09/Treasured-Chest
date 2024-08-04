package org.launchcode.TEAR_API.repositories;

import org.launchcode.TEAR_API.models.Memory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemoryRepository extends CrudRepository<Memory, Long> {
}
