
package com.internship.portal.controller;

import com.internship.portal.entity.InternshipApplication;
import com.internship.portal.repository.InternshipApplicationRepository;
import com.internship.portal.repository.InternshipRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class InternshipApplicationController {

    private final InternshipApplicationRepository applicationRepository;
    private final InternshipRepository internshipRepository;

    public InternshipApplicationController(
            InternshipApplicationRepository applicationRepository,
            InternshipRepository internshipRepository) {
        this.applicationRepository = applicationRepository;
        this.internshipRepository = internshipRepository;
    }

    @PostMapping
    public ResponseEntity<?> apply(
            @RequestBody InternshipApplication application) {

        if (application.getInternshipId() == null ||
                application.getStudentName() == null ||
                application.getStudentName().isBlank() ||
                application.getStudentEmail() == null ||
                application.getStudentEmail().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Please enter internship ID, name and email");
        }

        if (!internshipRepository.existsById(
                application.getInternshipId())) {

            return ResponseEntity.badRequest()
                    .body("Internship not found");
        }

        application.setStatus("PENDING");
        return ResponseEntity.ok(applicationRepository.save(application));
    }

    @GetMapping
    public List<InternshipApplication> getApplications(
            @RequestParam(required = false) String email) {

        if (email != null && !email.isBlank()) {
            return applicationRepository.findByStudentEmail(email);
        }

        return applicationRepository.findAll();
    }
}
