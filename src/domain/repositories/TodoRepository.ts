import type { Todo } from '../entities/Todo';

export interface TodoRepository {
  getAll(): Promise<Todo[]>;
  add(title: string): Promise<Todo>;
  toggle(id: string): Promise<Todo>;
  delete(id: string): Promise<void>;
}
