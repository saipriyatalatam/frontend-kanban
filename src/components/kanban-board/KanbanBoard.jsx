import React, { useEffect, useState } from 'react';
import KanbanColumn from '../kanban-column/KanbanColumn';
import DisplayFilter from '../display-filter/DisplayFilter';
import { fetchData } from '../../api/api';
import './KanbanBoard.css';
const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [grouping, setGrouping] = useState('status');
    const [sortOrder, setSortOrder] = useState('priority');

    // Define priority icons based on priority level
    const priorityIcons = {
        0: '/assets/No-priority.svg',
        1: '/assets/Img - Low Priority.svg',
        2: '/assets/Img - Medium Priority.svg',
        3: '/assets/Img - High Priority.svg',
        4: '/assets/SVG - Urgent Priority colour.svg',
    };

    // Define status icons based on status type
    const statusIcons = {
        'Backlog': '/assets/Backlog.svg',
        'Todo': '/assets/To-do.svg',
        'In progress': '/assets/in-progress.svg',
        'Done': '/assets/Done.svg',
        'Cancelled': '/assets/Cancelled.svg',
    };

    useEffect(() => {
        const savedGrouping = localStorage.getItem('kanbanGrouping');
        const savedSortOrder = localStorage.getItem('kanbanSortOrder');
        if (savedGrouping) setGrouping(savedGrouping);
        if (savedSortOrder) setSortOrder(savedSortOrder);

        fetchData().then(data => {
            setTickets(data.tickets);
            setUsers(data.users);
        });
    }, []);

    useEffect(() => {
        localStorage.setItem('kanbanGrouping', grouping);
        localStorage.setItem('kanbanSortOrder', sortOrder);
    }, [grouping, sortOrder]);

    const userMap = users.reduce((map, user) => {
        map[user.id] = { name: user.name, available: user.available };
        return map;
    }, {});

    const groupedTickets = groupTickets(tickets, grouping, sortOrder);

    // Determine columns based on grouping type
    const columns = [];
    if (grouping === 'status') {
        // Add each status type, even if empty, to display all five columns
        ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'].forEach(status => {
            columns.push({
                title: status,
                tickets: groupedTickets[status] || [],
                icon: statusIcons[status],
            });
        });
    } else if (grouping === 'priority') {
        const priorityLevels = [
            { level: 4, title: 'Urgent' },
            { level: 3, title: 'High' },
            { level: 2, title: 'Medium' },
            { level: 1, title: 'Low' },
            { level: 0, title: 'No Priority' },
        ];
    
        priorityLevels.forEach(({ level, title }) => {
            columns.push({
                title: title,
                tickets: groupedTickets[level] || [],
                icon: priorityIcons[level],
            });
        });
    }     
    else if (grouping === 'user') {
        // Add columns for each user
        users.forEach(user => {
            columns.push({
                title: user.name,
                tickets: groupedTickets[user.id] || [],
                icon: '/assets/profile-img.jpg',
                userId: user.id,
            });
        });
    }

    return (
        <div>
            <div style={{ backgroundColor: '#fff' }}>
            <DisplayFilter
                grouping={grouping}
                setGrouping={setGrouping}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            </div>
            
            <div className="kanban-board">
    {columns.map((column, index) => (
        <KanbanColumn
            key={index}
            title={column.title}
            tickets={column.tickets}
            userMap={userMap}
            icon={column.icon}
            availability={grouping === 'user' ? userMap[column.userId]?.available : null}
            grouping={grouping} 
        />
    ))}
</div>
        </div>
    );
};

const groupTickets = (tickets, grouping, sortOrder) => {
    let grouped = {};
    // Logic for grouping and sorting
    if (grouping === 'status') {
        grouped = tickets.reduce((acc, ticket) => {
            (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
            return acc;
        }, {});
    } else if (grouping === 'user') {
        grouped = tickets.reduce((acc, ticket) => {
            (acc[ticket.userId] = acc[ticket.userId] || []).push(ticket);
            return acc;
        }, {});
    } else if (grouping === 'priority') {
        grouped = tickets.reduce((acc, ticket) => {
            const priorityLevel = ticket.priority;
            (acc[priorityLevel] = acc[priorityLevel] || []).push(ticket);
            return acc;
        }, {});
    }

    Object.keys(grouped).forEach(group => {
        grouped[group] = grouped[group].sort((a, b) => {
            if (sortOrder === 'priority') return b.priority - a.priority;
            if (sortOrder === 'title') return a.title.localeCompare(b.title);
            return 0;
        });
    });

    return grouped;
};

export default KanbanBoard;




