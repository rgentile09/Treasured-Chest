import React from 'react';
import { ChildCard } from './ChildCard';

function ChildTable({ children, deleteChild }) {
    return (
          <div className="child-row">
            {children.map((child) => (
              <ChildCard key={child.id} child={child} deleteChild={deleteChild} />
            ))}
          </div>
      );
}

export default ChildTable;
