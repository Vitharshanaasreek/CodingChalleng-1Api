package com.example.demo.service;

import com.example.demo.model.Task;
import com.example.demo.repo.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepo;

    

    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepo.findById(id);
    }

    public Task createTask(Task task) {
        return taskRepo.save(task);
    }

    public Optional<Task> updateTask(Long id, Task newTask) {
        return taskRepo.findById(id).map(existingTask -> {
            existingTask.setTitle(newTask.getTitle());
            existingTask.setDescription(newTask.getDescription());
            existingTask.setDueDate(newTask.getDueDate());
            existingTask.setPriority(newTask.getPriority());
            existingTask.setStatus(newTask.getStatus());
            return taskRepo.save(existingTask);
        });
    }

    public boolean deleteTask(Long id) {
        if (taskRepo.existsById(id)) {
            taskRepo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
