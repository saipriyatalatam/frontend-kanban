import React from "react";
import KanbanCard from "../kanban-card/KanbanCard";
import "./KanbanColumn.css";

const KanbanColumn = ({
  title,
  tickets,
  userMap,
  icon,
  availability,
  grouping,
}) => (
  <div className="kanban-column">
    <div className="kanban-column-header">
      <div className="kanban-column-header-icon-wrapper">
        <img src={icon} alt={`${title} Icon`} className="kanban-column-icon" />
        {availability !== null && (
          <span
            className={`availability-status ${
              availability ? "bg-success" : "bg-secondary"
            }`}
          ></span>
        )}
      </div>

      <h3 className="kanban-column-title">{title}</h3>
      <div className="kanban-column-right-icons">
        <img
          src="/assets/add.svg"
          alt="Right Icon 1"
          className="kanban-right-add"
        />
        <img
          src="/assets/3 dot menu.svg"
          alt="Right Icon 2"
          className="kanban-right-dotmenu"
        />
      </div>
    </div>
    {tickets.map((ticket) => (
      <KanbanCard
        key={ticket.id}
        ticket={ticket}
        user={userMap[ticket.userId]}
        grouping={grouping}
      />
    ))}
  </div>
);

export default KanbanColumn;
