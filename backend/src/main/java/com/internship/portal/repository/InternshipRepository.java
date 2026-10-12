
package com.internship.portal.repository;

import com.internship.portal.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InternshipRepository
        extends JpaRepository<Internship, Long> {
}
