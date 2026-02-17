import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryTodoRepository } from '../data/repositories/InMemoryTodoRepository';
import {
  GetTodosUseCase,
  AddTodoUseCase,
  ToggleTodoUseCase,
  DeleteTodoUseCase,
} from '../domain/usecases/TodoUseCases';

describe('TodoUseCases', () => {
  let repository: InMemoryTodoRepository;

  beforeEach(() => {
    repository = new InMemoryTodoRepository();
    InMemoryTodoRepository.reset();
  });

  describe('GetTodosUseCase', () => {
    it('should return empty array when no todos exist', async () => {
      const useCase = new GetTodosUseCase(repository);
      const result = await useCase.execute();
      expect(result).toEqual([]);
    });

    it('should return all todos', async () => {
      await repository.add('Todo 1');
      await repository.add('Todo 2');
      const useCase = new GetTodosUseCase(repository);
      const result = await useCase.execute();
      expect(result).toHaveLength(2);
    });
  });

  describe('AddTodoUseCase', () => {
    it('should add a new todo', async () => {
      const useCase = new AddTodoUseCase(repository);
      const result = await useCase.execute('New Todo');
      expect(result.title).toBe('New Todo');
      expect(result.completed).toBe(false);
    });

    it('should throw error for empty title', async () => {
      const useCase = new AddTodoUseCase(repository);
      await expect(useCase.execute('')).rejects.toThrow('Todo title cannot be empty');
    });

    it('should trim whitespace from title', async () => {
      const useCase = new AddTodoUseCase(repository);
      const result = await useCase.execute('  Trimmed Todo  ');
      expect(result.title).toBe('Trimmed Todo');
    });
  });

  describe('ToggleTodoUseCase', () => {
    it('should toggle todo completed status', async () => {
      const todo = await repository.add('Todo');
      const useCase = new ToggleTodoUseCase(repository);
      const result = await useCase.execute(todo.id);
      expect(result.completed).toBe(true);
    });
  });

  describe('DeleteTodoUseCase', () => {
    it('should delete a todo', async () => {
      const todo = await repository.add('Todo');
      const useCase = new DeleteTodoUseCase(repository);
      await useCase.execute(todo.id);
      const todos = await repository.getAll();
      expect(todos).toHaveLength(0);
    });
  });
});
