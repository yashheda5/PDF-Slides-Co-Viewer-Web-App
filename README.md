# 📑 PDF Slides Co-Viewer

Welcome to **PDF Slides Co-Viewer**! This Next.js web application enables real-time collaborative viewing of PDF files. Users can take on either **Presenter** or **Viewer** roles to facilitate synchronous PDF navigation across devices. The app is built using **MongoDB**, **Socket.io**, **React-PDF Viewer**, and **Next.js**.

## 🌐 Live Demo

Try the live demo of PDF Slides Co-Viewer hosted on Vercel:  
[PDF Slides Co-Viewer Live Demo](https://pdf-slides-co-viewer-web-app.vercel.app/)

## 📦 Direct Download

Download the latest version of PDF Slides Co-Viewer as a ZIP file:  
[Download ZIP](https://github.com/yashheda5/PDF-Slides-Co-Viewer-Web-App/archive/refs/heads/main.zip)

## 🚀 Getting Started

To set up PDF Slides Co-Viewer locally, follow these steps:

1. **Clone the Repository**  
   Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yashheda5/PDF-Slides-Co-Viewer-Web-App.git
   ```

2. **Navigate to the project directory:**
   ```sh
   cd pdf-co-viewer
   ```

3. **Install the required packages:**
   ```sh
   npm install
   ```

4. **Start the development server for frontend and backend  :**
   ```sh
   npm run dev
   npm run dev
   ```

5. **Open the project in your browser at [`http://localhost:3000`](http://localhost:3000) to view your project**.

6. **To build the app for production, run:**
   ```sh
   npm run build
   ```

## 🔧 Key Functionalities

- **PDF Upload & Storage**: The Presenter can upload a PDF file, which is stored securely in MongoDB.
- **Real-time PDF Sync**: Page changes by the Presenter are broadcast to all connected Viewers in real time using Socket.io.
- **Smooth PDF Navigation**: The app utilizes the React-PDF Viewer with built-in navigation features for an enhanced user experience.
- **Role-Based UI**: Different interfaces for Presenter and Viewer roles, with a simple selection process on the landing page.

## 🗂️ Code Overview

### API Routes

- **GET /api/getPdf**: Retrieves the latest uploaded PDF from MongoDB.
- **POST /api/upload**: Handles PDF uploads from the Presenter, validating file type and saving it to the database.
- **/api/socket**: Initializes and manages the Socket.io server for real-time page synchronization.

### Components

- **Home Component**: The landing page where users select their role (Presenter or Viewer).
- **PresenterComponent**: Manages PDF upload and handles real-time navigation events for Presenter.
- **ViewerComponent**: Listens for page change events and updates the current page for Viewers.

## 🤝 Contributing

Contributions are welcome! If you have suggestions, improvements, or find any issues, feel free to open an issue or submit a pull request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.