
package com.internship.portal.repository;

import com.internship.portal.entity.InternshipApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InternshipApplicationRepository
        extends JpaRepository<InternshipApplication, Long> {

    List<InternshipApplication> findByStudentEmail(String studentEmail);
}
