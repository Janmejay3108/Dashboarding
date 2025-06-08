import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, MoreHorizontal, User, Calendar, Flag } from 'lucide-react';
import './Kanban.css';

// Sortable Task Item Component
const SortableTaskItem = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task-item"
    >
      <div className="task-header">
        <span className={`priority-indicator ${task.priority}`}></span>
        <button className="task-menu">
          <MoreHorizontal size={14} />
        </button>
      </div>
      <h4 className="task-title">{task.title}</h4>
      <p className="task-description">{task.description}</p>
      <div className="task-meta">
        <div className="task-assignee">
          <User size={14} />
          <span>{task.assignee}</span>
        </div>
        <div className="task-due-date">
          <Calendar size={14} />
          <span>{task.dueDate}</span>
        </div>
      </div>
      <div className="task-tags">
        {task.tags.map((tag, index) => (
          <span key={index} className="task-tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

// Droppable Column Component
const KanbanColumn = ({ column, tasks }) => {
  const taskIds = tasks.map(task => task.id);

  return (
    <div className="kanban-column">
      <div className="column-header">
        <div className="column-title">
          <span className={`column-indicator ${column.id}`}></span>
          <h3>{column.title}</h3>
          <span className="task-count">{tasks.length}</span>
        </div>
        <button className="add-task-btn">
          <Plus size={16} />
        </button>
      </div>
      
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="column-tasks">
          {tasks.map((task) => (
            <SortableTaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

const Kanban = () => {
  const [activeId, setActiveId] = useState(null);
  
  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'inprogress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' },
  ];

  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      title: 'Design new dashboard layout',
      description: 'Create wireframes and mockups for the new admin dashboard',
      assignee: 'Priya Sharma',
      dueDate: '2025-06-15',
      priority: 'high',
      status: 'todo',
      tags: ['Design', 'UI/UX']
    },
    {
      id: 'task-2',
      title: 'Implement user authentication',
      description: 'Set up JWT-based authentication system',
      assignee: 'Rajesh Kumar',
      dueDate: '2025-06-12',
      priority: 'high',
      status: 'inprogress',
      tags: ['Backend', 'Security']
    },
    {
      id: 'task-3',
      title: 'Database optimization',
      description: 'Optimize database queries for better performance',
      assignee: 'Amit Patel',
      dueDate: '2025-06-18',
      priority: 'medium',
      status: 'todo',
      tags: ['Database', 'Performance']
    },
    {
      id: 'task-4',
      title: 'API documentation',
      description: 'Write comprehensive API documentation',
      assignee: 'Sneha Gupta',
      dueDate: '2025-06-10',
      priority: 'low',
      status: 'review',
      tags: ['Documentation', 'API']
    },
    {
      id: 'task-5',
      title: 'Mobile responsiveness',
      description: 'Make the dashboard mobile-friendly',
      assignee: 'Vikram Singh',
      dueDate: '2025-06-20',
      priority: 'medium',
      status: 'inprogress',
      tags: ['Frontend', 'Mobile']
    },
    {
      id: 'task-6',
      title: 'Unit testing setup',
      description: 'Set up unit testing framework and write initial tests',
      assignee: 'Kavya Reddy',
      dueDate: '2025-06-08',
      priority: 'medium',
      status: 'done',
      tags: ['Testing', 'Quality']
    },
    {
      id: 'task-7',
      title: 'Payment integration',
      description: 'Integrate Razorpay payment gateway',
      assignee: 'Arjun Nair',
      dueDate: '2025-06-25',
      priority: 'high',
      status: 'todo',
      tags: ['Payment', 'Integration']
    },
    {
      id: 'task-8',
      title: 'Performance monitoring',
      description: 'Set up application performance monitoring',
      assignee: 'Meera Joshi',
      dueDate: '2025-06-14',
      priority: 'low',
      status: 'review',
      tags: ['Monitoring', 'DevOps']
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const findContainer = (id) => {
    if (id in tasks) {
      return id;
    }
    
    const task = tasks.find(task => task.id === id);
    return task ? task.status : null;
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    const overId = over?.id;

    if (!overId) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setTasks((prev) => {
      const activeItems = prev.filter(task => task.status === activeContainer);
      const overItems = prev.filter(task => task.status === overContainer);

      const activeIndex = activeItems.findIndex(task => task.id === active.id);
      const overIndex = overItems.findIndex(task => task.id === overId);

      let newIndex;
      if (overId in overItems) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem = over && overIndex < overItems.length - 1;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return prev.map(task => {
        if (task.id === active.id) {
          return { ...task, status: overContainer };
        }
        return task;
      });
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer) {
      setActiveId(null);
      return;
    }

    if (activeContainer === overContainer) {
      const items = tasks.filter(task => task.status === activeContainer);
      const oldIndex = items.findIndex(task => task.id === active.id);
      const newIndex = items.findIndex(task => task.id === over.id);

      if (oldIndex !== newIndex) {
        const reorderedItems = arrayMove(items, oldIndex, newIndex);
        setTasks(prev => {
          const otherTasks = prev.filter(task => task.status !== activeContainer);
          return [...otherTasks, ...reorderedItems];
        });
      }
    }

    setActiveId(null);
  };

  const activeTask = activeId ? tasks.find(task => task.id === activeId) : null;

  return (
    <div className="kanban-page">
      <div className="page-header">
        <h1>Project Board</h1>
        <p>Manage your project tasks with drag-and-drop Kanban board.</p>
      </div>

      <div className="kanban-controls">
        <div className="board-info">
          <h2>Development Sprint #3</h2>
          <p>Team: Frontend & Backend Development</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} />
          Add Task
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban-board">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={getTasksByStatus(column.id)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <SortableTaskItem task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Kanban;
