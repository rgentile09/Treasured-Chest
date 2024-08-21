package org.launchcode.TEAR_API.controllers;

import jakarta.servlet.http.HttpSession;

import org.launchcode.TEAR_API.models.Child;
import org.launchcode.TEAR_API.models.Questionnaire;
import org.launchcode.TEAR_API.models.User;
import org.launchcode.TEAR_API.repositories.ChildRepository;
import org.launchcode.TEAR_API.repositories.QuestionnaireRepository;
//import org.launchcode.TEAR_API.repositories.UserRepository; // Assuming you have a UserRepository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/questionnaires")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class QuestionnaireController {

    @Autowired
    private QuestionnaireRepository questionnaireRepository;
    
    @Autowired
    private UserController userController;

    @Autowired
    private ChildRepository childRepository;

    @GetMapping
    public ResponseEntity<List<Questionnaire>> getAllQuestionnaires(HttpSession session) {
        User user = userController.getUserFromSession(session);
        if (user != null) {
            List<Questionnaire> questionnaires = questionnaireRepository.findByUserId(user.getId()); // Fetch by user ID
            return ResponseEntity.ok(questionnaires);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/child/{childId}")
    public ResponseEntity<?> getQuestionnaireByChildId(@PathVariable Long childId, HttpSession session) {
        User user = userController.getUserFromSession(session);
        if (user != null) {
            List<Questionnaire> questionnaires = questionnaireRepository.findByChildId(childId);

            if (!questionnaires.isEmpty()) {
                return ResponseEntity.ok(questionnaires);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "No questionnaires found for the specified child ID"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @PostMapping
    public ResponseEntity<Map<String, String>> addQuestionnaire(HttpSession session, 
                                                                 @RequestBody Questionnaire questionnaireRequest) {
        User user = userController.getUserFromSession(session);
        Map<String, String> responseBody = new HashMap<>();
        
        if (user != null) {
            Long childId = questionnaireRequest.getChild().getId(); // Assuming childId is sent in the request body
            Optional<Child> optionalChild = childRepository.findById(childId);
    
            if (optionalChild.isPresent()) {
                Child child = optionalChild.get();
                // Check if userId equals the child's userID
                if (!child.getUser().getId().equals(user.getId())) {
                    responseBody.put("message", "Cannot add questionnaire. This is not your Child!");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
                }
    
                // Set the user and child for the new questionnaire
                questionnaireRequest.setUser(user);
                questionnaireRequest.setChild(child);
    
                // Save the new questionnaire to the repository
                questionnaireRepository.save(questionnaireRequest);
    
                responseBody.put("message", "Questionnaire successfully created");
                return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
            } else {    
                responseBody.put("message", "Child not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
            }
        } else {
            responseBody.put("message", "User not found in session");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
        }
    }
    

    @DeleteMapping("/{questionnaireId}")
    public ResponseEntity<Map<String, String>> deleteQuestionnaire(@PathVariable Long questionnaireId) {
        Map<String, String> responseBody = new HashMap<>();

        if (questionnaireRepository.existsById(questionnaireId)) {
            questionnaireRepository.deleteById(questionnaireId);
            responseBody.put("message", "Questionnaire successfully deleted");
            return ResponseEntity.ok(responseBody);
        } else {
            responseBody.put("message", "Questionnaire not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
        }
    }
}  

