# PaintPals

**PaintPals** is a multiplayer drawing application inspired by the classic MS Paint. It allows multiple users to collaborate on the same canvas in real-time, making it perfect for creating collaborative art, brainstorming visually, or simply having fun with friends.

## 🎨 Features

- **Real-time Collaborative Drawing**: Draw together with friends or colleagues in real-time on the same canvas.
- **Versatile Drawing Tools**: Choose from tools like brush, eraser, line, rectangle, and circle.
- **Customization Options**: Adjust brush size and color to suit your creative needs.
- **Drawing Management**:
  - Save: Preserve your artwork for later.
  - Load: Revisit saved drawings.
  - Clear: Start fresh with a blank canvas.
  - Download: Save your creation to your device as an image.
- **Responsive Design**: Enjoy a seamless experience across all devices with a clean, Material-UI-powered interface.

## 🚀 Technologies Used

PaintPals is built with the following technologies:

- **Frontend**:
  - React: For a dynamic and responsive user interface.
  - Material-UI: For modern and responsive UI components.
- **Backend**:
  - Node.js: Handles server-side functionality and API.
  - Socket.IO: Powers real-time collaboration between users.

## 📖 How to Use

1. Open your browser and navigate to [PaintPals](https://paintpals.vercel.app).
2. Enter a **room name** and your **username** to join an existing room or create a new one.
3. Start drawing! Use the toolbar to select tools, change brush size, pick colors, and manage your drawings.
4. Collaborate with other users in real-time on the shared canvas.

## 🛠️ Development Setup

Follow these steps to set up PaintPals locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/crizmo/PaintPals.git
   cd paintpals
   ```

2. Install dependencies for both client and server:
   ```bash
   # For the client
   cd client
   npm install

   # For the server
   cd ../server
   npm install
   ```

3. Start the development servers:
   ```bash
   # In the client directory
   npm run dev

   # In the server directory
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173` to use PaintPals.

## 🤝 Contributing

We welcome contributions to PaintPals! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request and describe your changes in detail.

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
