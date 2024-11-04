import React,  { useState } from 'react';
import './DisplayFilter.css';


const DisplayFilter = ({ grouping, setGrouping, sortOrder, setSortOrder }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="display-filter dropdown">
        <button onClick={toggleDropdown} className="dropdown-toggle">
        <img src="/assets/Display.svg" alt="display-icon"/>
          <div className="dropdown-title-icon">
            <span>Display</span>
            <img src="/assets/down.svg" alt="arrow-down"/>
          </div>
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <label>Grouping</label>
              <select value={grouping} onChange={e => {setGrouping(e.target.value);
                setIsOpen(false);
              }}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <label>Ordering</label>
              <select value={sortOrder} onChange={e => {setSortOrder(e.target.value);
  setIsOpen(false);
  
              }}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default DisplayFilter;