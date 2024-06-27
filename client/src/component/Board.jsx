import React, { useRef, useEffect } from 'react';

const Board = ({ brushColor, brushSize, roomName, tool, socket }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        const startDrawing = (e) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        const draw = (e) => {
            if (!isDrawing) return;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const x0 = lastX;
            const y0 = lastY;
            const x1 = e.offsetX;
            const y1 = e.offsetY;

            if (ctx) {
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                if (tool === 'eraser') {
                    ctx.globalCompositeOperation = 'destination-out';
                    ctx.strokeStyle = 'rgba(0,0,0,1)';
                } else {
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.strokeStyle = brushColor;
                }
                ctx.lineWidth = brushSize;
                ctx.beginPath();
                ctx.moveTo(x0, y0);
                ctx.lineTo(x1, y1);
                ctx.stroke();
                ctx.closePath();
            }

            [lastX, lastY] = [x1, y1];

            if (socket) {
                socket.emit('drawing', { x0, y0, x1, y1, color: brushColor, size: brushSize, tool, roomName });
            }
        };

        const endDrawing = () => {
            isDrawing = false;
        };

        const canvas = canvasRef.current;

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mouseout', endDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('mouseout', endDrawing);
        };
    }, [brushColor, brushSize, socket, tool]);

    useEffect(() => {
        const handleWindowResize = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            const savedImage = new Image();
            savedImage.src = canvas.toDataURL();
            
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

            savedImage.onload = () => {
                ctx.drawImage(savedImage, 0, 0);
            };
        };

        window.addEventListener('resize', handleWindowResize);

        handleWindowResize();

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <canvas
            className='canvas'
            ref={canvasRef}
            style={{ backgroundColor: 'white' }}
        />
    );
};

export default Board;
