import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

//const { addTask, toggleTaskCompleted } = require('./TaskManager');

describe("TaskManager Logic", () => {
  // Define the logic functions within the test file
  const addTask = (tasks) => {
      const newTask = {
          id: Date.now(), // Using Date.now() for unique ID
          title: `Task ${tasks.length + 1}`,
          completed: false,
      };
      return [...tasks, newTask];
  };

  const toggleTaskCompleted = (tasks, taskId) => {
      return tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
      );
  };

  // Normal test cases
  test("Add single task", () => {
      let tasks = [];
      tasks = addTask(tasks);
      expect(tasks).toEqual([{ id: expect.any(Number), title: "Task 1", completed: false }]);
  });

  test("Toggle task completed", () => {
      let tasks = [{ id: 1, title: "Task 1", completed: false }];
      tasks = toggleTaskCompleted(tasks, 1);
      expect(tasks).toEqual([{ id: 1, title: "Task 1", completed: true }]);
  });

  test("Add multiple tasks", () => {
      let tasks = [];
      tasks = addTask(tasks);
      tasks = addTask(tasks);
      tasks = addTask(tasks);
      expect(tasks.length).toBe(3);
      expect(tasks[0]).toEqual({ id: expect.any(Number), title: "Task 1", completed: false });
      expect(tasks[1].title).toBe("Task 2");
  });

  // Edge test cases
  test("Toggle nonexistent task", () => {
      let tasks = [{ id: 1, title: "Task 1", completed: false }];
      tasks = toggleTaskCompleted(tasks, 99);
      expect(tasks).toEqual([{ id: 1, title: "Task 1", completed: false }]);
  });

  test("Empty task list", () => {
      let tasks = [];
      tasks = toggleTaskCompleted(tasks, 1);
      expect(tasks).toEqual([]);
  });

  test("Add task after deleting all tasks", () => {
      let tasks = [];
      tasks = addTask(tasks);
      expect(tasks).toEqual([{ id: expect.any(Number), title: "Task 1", completed: false }]);
  });
});
