package org.launchcode.TEAR_API.repositories;

import org.launchcode.TEAR_API.models.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
    List<Comment> findByMemoryId(Long memoryId);
}