package com.example.demo.repo;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Task;
import com.example.demo.model.User;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

	static List<Task> findByUser(User user) {
		// TODO Auto-generated method stub
		return null;
	}
	static Optional<Task> findByIdAndUser(Long id, User user) {
		// TODO Auto-generated method stub
		return null;
	}
}
