import React from 'react';
import ToolButton from './ToolButton';

const ToolBar = ({ tools, brushSize, setBrushSize, brushColor, setBrushColor, setTool }) => {
  return (
    <div className="toolbar">
      <div className="tools">
        {tools.map((toolItem, index) => (
          <ToolButton key={index} toolItem={toolItem} setTool={setTool} />
        ))}
      </div>
      <div className="tool-group brush-size">
        <span>Size:</span>
        <input
          type="range"
          min="1"
          max="100"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
        />
        <span>{brushSize}</span>
      </div>
      <div className="tool-group color-picker">
        <span>Color:</span>
        <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
      </div>
    </div>
  );
};

export default ToolBar;
