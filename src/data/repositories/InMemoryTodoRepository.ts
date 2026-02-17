import type { Todo } from '../../domain/entities/Todo';
import type { TodoRepository } from '../../domain/repositories/TodoRepository';

let todos: Todo[] = [];
let idCounter = 0;

export class InMemoryTodoRepository implements TodoRepository {
  async getAll(): Promise<Todo[]> {
    return [...todos];
  }

  async add(title: string): Promise<Todo> {
    const newTodo: Todo = {
      id: String(++idCounter),
      title,
      completed: false,
      createdAt: new Date(),
    };
    todos.push(newTodo);
    return newTodo;
  }

  async toggle(id: string): Promise<Todo> {
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    todo.completed = !todo.completed;
    return { ...todo };
  }

  async delete(id: string): Promise<void> {
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }
    todos.splice(index, 1);
  }

  static reset(): void {
    todos = [];
    idCounter = 0;
  }
}
