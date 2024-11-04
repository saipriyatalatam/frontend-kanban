import React from "react";
import "./KanbanCard.css";

const KanbanCard = ({ ticket, user, grouping }) => {
  const priorityIcons = {
    0: "/assets/No-priority.svg",
    1: "/assets/Img - Low Priority.svg",
    2: "/assets/Img - Medium Priority.svg",
    3: "/assets/Img - High Priority.svg",
    4: "/assets/SVG - Urgent Priority colour.svg",
  };

  const statusIcons = {
    Backlog: "/assets/Backlog.svg",
    Todo: "/assets/To-do.svg",
    "In progress": "/assets/in-progress.svg",
    Done: "/assets/Done.svg",
    Cancelled: "/assets/Cancelled.svg",
  };

  const getUserStatus = () => {
    return user.available ? "bg-success" : "bg-secondary";
  };

  return (
    <div className="kanban-card">
      <div className="kanban-card-header">
        <span className="kanban-card-id">{ticket.id}</span>
        {grouping !== "user" && (
          <div className="kanban-avatar">
            <img
              className="kanban-avatar-img"
              src="/assets/profile-img.jpg"
              alt="User Avatar"
            />
            <span className={`kanban-avatar-status ${getUserStatus()}`}></span>
          </div>
        )}
      </div>
      <div className="kanban-card-content">
        <div className="kanban-status-title-wrapper">
          {grouping !== "status" && (
            <span className="kanban-card-ticket-status">
              <img
                src={statusIcons[ticket.status]}
                alt={`${ticket.status} Icon`}
              />
            </span>
          )}
          <h4 className="kanban-card-title">{ticket.title}</h4>
        </div>
        <div className="kanban-card-labels">
          {grouping !== "priority" && (
            <span className="kanban-priority-icon">
              <img src={priorityIcons[ticket.priority]} alt="Priority Icon" />
            </span>
          )}
          <div className="kanban-tag"><span className="kanban-tag-circle"></span>{ticket.tag}</div>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
