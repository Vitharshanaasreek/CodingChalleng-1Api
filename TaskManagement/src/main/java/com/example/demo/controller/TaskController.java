package com.example.demo.controller;



import com.example.demo.model.Task;
import com.example.demo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/task") // singular base path
public class TaskController {

    @Autowired
    private TaskService taskService;

    // ✅ Get all tasks → /task/all
    @GetMapping("/all")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // ✅ Get task by ID → /task/view/{id}
    @GetMapping("/view/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Add new task → /task/add
    @PostMapping("/add")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task savedTask = taskService.createTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }

    // ✅ Update task → /task/update/{id}
    @PutMapping("/update/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        Optional<Task> updated = taskService.updateTask(id, task);
        return updated.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete task → /task/delete/{id}
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        boolean deleted = taskService.deleteTask(id);
        return deleted ? ResponseEntity.noContent().build()
                       : ResponseEntity.notFound().build();
    }
}
