
package com.internship.portal.controller;

import com.internship.portal.entity.Internship;
import com.internship.portal.repository.InternshipRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/internships")
@CrossOrigin(origins = "http://localhost:5173")
public class InternshipController {

    private final InternshipRepository repository;

    public InternshipController(InternshipRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Internship> getAllInternships() {
        return repository.findAll();
    }

    @PostMapping
    public Internship createInternship(@RequestBody Internship internship) {
        return repository.save(internship);
    }
}
