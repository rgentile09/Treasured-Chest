package org.launchcode.TEAR_API.repositories;


import org.launchcode.TEAR_API.models.Questionnaire;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionnaireRepository extends CrudRepository<Questionnaire, Long> {
    List<Questionnaire> findByUserId(Long userId);
    List<Questionnaire> findByChildId(Long childId); // Corrected method name
}


