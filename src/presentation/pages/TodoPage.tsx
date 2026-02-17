import { useState, useEffect } from 'react';
import type { Todo } from '../../domain/entities/Todo';
import {
  GetTodosUseCase,
  AddTodoUseCase,
  ToggleTodoUseCase,
  DeleteTodoUseCase,
} from '../../domain/usecases/TodoUseCases';
import { InMemoryTodoRepository } from '../../data/repositories/InMemoryTodoRepository';
import { TodoList } from '../components/TodoList';

const repository = new InMemoryTodoRepository();
const getTodosUseCase = new GetTodosUseCase(repository);
const addTodoUseCase = new AddTodoUseCase(repository);
const toggleTodoUseCase = new ToggleTodoUseCase(repository);
const deleteTodoUseCase = new DeleteTodoUseCase(repository);

export function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodosUseCase.execute().then(setTodos).catch(console.error);
  }, []);

  const handleAdd = async () => {
    try {
      setError(null);
      await addTodoUseCase.execute(input);
      setInput('');
      const result = await getTodosUseCase.execute();
      setTodos(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleTodoUseCase.execute(id);
      const result = await getTodosUseCase.execute();
      setTodos(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle todo');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodoUseCase.execute(id);
      const result = await getTodosUseCase.execute();
      setTodos(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      {error && <p data-testid="error-message">{error}</p>}
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter todo"
          data-testid="todo-input"
        />
        <button onClick={handleAdd} data-testid="add-button">
          Add
        </button>
      </div>
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
