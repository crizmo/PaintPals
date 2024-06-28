import React from 'react';

const FileOptions = ({ saveDrawing, loadDrawing, clearSavedDrawing, clearCanvas, downloadDrawing }) => {
  return (
    <div className="file-options">
      <button onClick={saveDrawing}>Save</button>
      <button onClick={loadDrawing}>Load</button>
      <button onClick={clearSavedDrawing}>Delete</button>
      <button onClick={clearCanvas}>Clear</button>
      <button onClick={downloadDrawing}>Download</button>
    </div>
  );
};

export default FileOptions;
