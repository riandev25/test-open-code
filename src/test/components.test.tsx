import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '../presentation/components/TodoItem';
import { TodoList } from '../presentation/components/TodoList';
import type { Todo } from '../domain/entities/Todo';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'Test Todo',
    completed: false,
    createdAt: new Date(),
  };

  it('should render todo title', () => {
    render(
      <TodoItem todo={mockTodo} onToggle={() => {}} onDelete={() => {}} />
    );
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('should call onToggle when checkbox is clicked', () => {
    const onToggle = vi.fn();
    render(
      <TodoItem todo={mockTodo} onToggle={onToggle} onDelete={() => {}} />
    );
    fireEvent.click(screen.getByTestId('toggle-1'));
    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('should call onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(
      <TodoItem todo={mockTodo} onToggle={() => {}} onDelete={onDelete} />
    );
    fireEvent.click(screen.getByTestId('delete-1'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});

describe('TodoList', () => {
  it('should render empty message when no todos', () => {
    render(<TodoList todos={[]} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByTestId('empty-message')).toBeInTheDocument();
  });

  it('should render list of todos', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Todo 1', completed: false, createdAt: new Date() },
      { id: '2', title: 'Todo 2', completed: true, createdAt: new Date() },
    ];
    render(
      <TodoList todos={todos} onToggle={() => {}} onDelete={() => {}} />
    );
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });
});
