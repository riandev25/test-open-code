import type { Todo } from '../../domain/entities/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        data-testid={`toggle-${todo.id}`}
      />
      <span>{todo.title}</span>
      <button
        onClick={() => onDelete(todo.id)}
        data-testid={`delete-${todo.id}`}
      >
        Delete
      </button>
    </li>
  );
}
