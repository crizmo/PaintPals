import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const Board = (props) => {
    const { brushColor, brushSize, roomName, tool } = props;
    const canvasRef = useRef(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('https://co-draw.onrender.com');
        setSocket(newSocket);

        newSocket.emit('joinRoom', roomName);

        // Request current canvas state after joining the room
        newSocket.emit('requestCanvasState', roomName);

        return () => {
            newSocket.disconnect();
        };
    }, [roomName]);

    useEffect(() => {
        if (socket) {
            socket.on('drawing', ({ x0, y0, x1, y1, color, size, tool }) => {
                // console.log('Drawing', x0, y0, x1, y1, color, size, tool);
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    if (tool === 'eraser') {
                        ctx.globalCompositeOperation = 'destination-out';
                        ctx.strokeStyle = 'rgba(0,0,0,1)';
                    } else {
                        ctx.globalCompositeOperation = 'source-over';
                        ctx.strokeStyle = color;
                    }
                    ctx.lineWidth = size;
                    ctx.beginPath();
                    ctx.moveTo(x0, y0);
                    ctx.lineTo(x1, y1);
                    ctx.stroke();
                    ctx.closePath();
                }
            });

            socket.on('canvasImage', (data) => {
                if (data.roomName === roomName) {
                    const image = new Image();
                    image.src = data.image;

                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');
                    image.onload = () => {
                        ctx.drawImage(image, 0, 0);
                    };
                }
            });

            socket.on('currentCanvasState', (data) => {
                if (data.roomName === roomName) {
                    const image = new Image();
                    image.src = data.image;

                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');
                    image.onload = () => {
                        ctx.drawImage(image, 0, 0);
                    };
                }
            });
        }

        return () => {
            if (socket) {
                socket.off('drawing');
                socket.off('canvasImage');
                socket.off('currentCanvasState');
            }
        };
    }, [socket, roomName]);

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
            
            // Save the current canvas content
            const savedImage = new Image();
            savedImage.src = canvas.toDataURL();
            
            // Resize the canvas
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

            // Redraw the saved content
            savedImage.onload = () => {
                ctx.drawImage(savedImage, 0, 0);
            };

            console.log(canvas.width, canvas.height);
        };

        window.addEventListener('resize', handleWindowResize);

        // Initial resize to set canvas size correctly on first render
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
