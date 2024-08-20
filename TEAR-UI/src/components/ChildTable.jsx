import React from 'react';
import { ChildCard } from './ChildCard';

function ChildTable({ children, deleteChild }) {
    return (
        <div className="container">
          <div className="row">
            {children.map((child) => (
              <ChildCard key={child.id} child={child} deleteChild={deleteChild} />
            ))}
          </div>
        </div>
      );
}

export default ChildTable;
