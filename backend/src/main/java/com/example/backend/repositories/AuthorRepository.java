package com.example.backend.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entity.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}
