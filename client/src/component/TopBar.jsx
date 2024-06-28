import React from 'react';

const TopBar = ({ saveDrawing, loadDrawing, clearSavedDrawing, clearCanvas, downloadDrawing }) => {
  return (
    <div className="topbar">
      <div className="file">
        <button>File</button>
        <div className="file-options">
          <button onClick={saveDrawing}>Save</button>
          <button onClick={loadDrawing}>Load</button>
          <button onClick={clearSavedDrawing}>Delete</button>
          <button onClick={clearCanvas}>Clear</button>
          <button onClick={downloadDrawing}>Download</button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
