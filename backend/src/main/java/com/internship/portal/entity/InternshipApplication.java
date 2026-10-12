
package com.internship.portal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "internship_application")
public class InternshipApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long internshipId;
    private String studentName;
    private String studentEmail;
    private String status = "PENDING";

    public InternshipApplication() {}

    public Long getId() {
        return id;
    }

    public Long getInternshipId() {
        return internshipId;
    }

    public void setInternshipId(Long internshipId) {
        this.internshipId = internshipId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
