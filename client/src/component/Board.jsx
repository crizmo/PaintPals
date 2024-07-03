import React, { useRef, useEffect, useState } from 'react';

const Board = ({ brushColor, brushSize, roomName, tool, socket }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [savedImage, setSavedImage] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const startDrawing = (e) => {
            setIsDrawing(true);
            setStartX(e.offsetX);
            setStartY(e.offsetY);

            if (tool === 'line' || tool === 'rectangle') {
                setSavedImage(ctx.getImageData(0, 0, canvas.width, canvas.height));
            }
        };

        const draw = (e) => {
            if (!isDrawing) return;

            const x1 = e.offsetX;
            const y1 = e.offsetY;

            if (tool === 'brush' || tool === 'eraser') {
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
                ctx.moveTo(startX, startY);
                ctx.lineTo(x1, y1);
                ctx.stroke();
                ctx.closePath();

                setStartX(x1);
                setStartY(y1);

                if (socket) {
                    socket.emit('drawing', { x0: startX, y0: startY, x1, y1, color: brushColor, size: brushSize, tool, roomName });
                }
            } else if (tool === 'line') {
                ctx.putImageData(savedImage, 0, 0);
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(x1, y1);
                ctx.stroke();
                ctx.closePath();
            } else if (tool === 'rectangle') {
                ctx.putImageData(savedImage, 0, 0);
                const width = x1 - startX;
                const height = y1 - startY;
                ctx.strokeRect(startX, startY, width, height);
            }
        };

        const endDrawing = (e) => {
            if (!isDrawing) return;
            setIsDrawing(false);

            const x1 = e.offsetX;
            const y1 = e.offsetY;

            if ((tool === 'line' || tool === 'rectangle') && socket) {
                socket.emit('drawing', { x0: startX, y0: startY, x1, y1, color: brushColor, size: brushSize, tool, roomName });
            }
        };

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
    }, [brushColor, brushSize, socket, tool, roomName, isDrawing, startX, startY, savedImage]);

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
