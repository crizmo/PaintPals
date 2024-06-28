import React from 'react';

const ToolButton = ({ toolItem, setTool }) => {
  return (
    <button onClick={() => setTool(toolItem.action)}>
      {toolItem.icon}
    </button>
  );
};

export default ToolButton;
