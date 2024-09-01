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

        const getOffset = (e) => {
            const rect = canvas.getBoundingClientRect();
            if (e.touches) {
                return {
                    offsetX: e.touches[0].clientX - rect.left,
                    offsetY: e.touches[0].clientY - rect.top,
                };
            } else {
                return {
                    offsetX: e.offsetX,
                    offsetY: e.offsetY,
                };
            }
        };

        const startDrawing = (e) => {
            e.preventDefault();
            const { offsetX, offsetY } = getOffset(e);
            setIsDrawing(true);
            setStartX(offsetX);
            setStartY(offsetY);

            if (tool === 'line' || tool === 'rectangle' || tool === 'circle') {
                setSavedImage(ctx.getImageData(0, 0, canvas.width, canvas.height));
            }
        };

        const draw = (e) => {
            e.preventDefault();
            if (!isDrawing) return;

            const { offsetX, offsetY } = getOffset(e);
            const x1 = offsetX;
            const y1 = offsetY;

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
                ctx.lineWidth = brushSize;
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(x1, y1);
                ctx.stroke();   
                ctx.strokeStyle = brushColor;
                ctx.closePath();
            } else if (tool === 'rectangle') {
                ctx.putImageData(savedImage, 0, 0);
                ctx.lineWidth = brushSize;
                ctx.strokeStyle = brushColor;
                const width = x1 - startX;
                const height = y1 - startY;
                ctx.strokeRect(startX, startY, width, height);
            } else if (tool === 'circle') {
                ctx.putImageData(savedImage, 0, 0);
                ctx.strokeStyle = brushColor;
                ctx.lineWidth = brushSize;
                const radius = Math.sqrt(Math.pow(x1 - startX, 2) + Math.pow(y1 - startY, 2));
                ctx.beginPath();
                ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.closePath();
            }
        };

        const endDrawing = (e) => {
            e.preventDefault();
            if (!isDrawing) return;
            setIsDrawing(false);

            const { offsetX, offsetY } = getOffset(e);
            const x1 = offsetX;
            const y1 = offsetY;

            if ((tool === 'line' || tool === 'rectangle' || tool === 'circle') && socket) {
                socket.emit('drawing', { x0: startX, y0: startY, x1, y1, color: brushColor, size: brushSize, tool, roomName });
            }
        };

        // Mouse events
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mouseout', endDrawing);

        // Touch events
        canvas.addEventListener('touchstart', startDrawing, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', endDrawing, { passive: false });

        return () => {
            // Mouse events
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('mouseout', endDrawing);

            // Touch events
            canvas.removeEventListener('touchstart', startDrawing);
            canvas.removeEventListener('touchmove', draw);
            canvas.removeEventListener('touchend', endDrawing);
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

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        // Initial setup
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    return (
        <canvas
            className='canvas'
            ref={canvasRef}
            style={{ backgroundColor: 'white', touchAction: 'none' }}
        />
    );
};

export default Board;
