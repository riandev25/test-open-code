import type { Todo } from '../entities/Todo';
import type { TodoRepository } from '../repositories/TodoRepository';

export class GetTodosUseCase {
  constructor(private repository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return this.repository.getAll();
  }
}

export class AddTodoUseCase {
  constructor(private repository: TodoRepository) {}

  async execute(title: string): Promise<Todo> {
    if (!title.trim()) {
      throw new Error('Todo title cannot be empty');
    }
    return this.repository.add(title.trim());
  }
}

export class ToggleTodoUseCase {
  constructor(private repository: TodoRepository) {}

  async execute(id: string): Promise<Todo> {
    return this.repository.toggle(id);
  }
}

export class DeleteTodoUseCase {
  constructor(private repository: TodoRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
