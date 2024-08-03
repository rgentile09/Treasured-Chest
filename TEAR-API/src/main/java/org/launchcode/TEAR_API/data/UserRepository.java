package org.launchcode.TEAR_API.data;

import org.launchcode.TEAR_API.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsername(String username);
}
