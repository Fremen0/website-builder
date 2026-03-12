# TWB - Client (Frontend)

This is the frontend component of the **Template Website Builder (TWB)**, built using React and modern web technologies to provide a high-performance, drag-and-drop design experience.

## 🛠 Prerequisites

To run and build this frontend application, you will need:
- **Node.js**: v16.0.0 or higher.
- **npm**: v8.0.0 or higher (comes with Node.js).
- **Web Browser**: A modern web browser like Google Chrome, Firefox, or Edge.

## 📦 Tech Stack

- **Framework**: React.js
- **Drag & Drop**: React DnD
- **Styling**: CSS Modules (Vanilla CSS for maximum control)
- **Icons**: Font Awesome 5
- **Routing**: React Router DOM
- **HTTP Client**: Axios

## 🚀 Available Scripts

In this project directory (`/client`), you can run:

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified, and the filenames include hashes.

## 📁 Directory Structure Overview

- `/public`: Static assets like `index.html`, icons, and splash screens.
- `/src/components`: Reusable UI components (Editor, Toolbar, Properties Panel, Sidebar, etc.).
- `/src/pages`: Main page layouts (AuthPage, Dashboard, Editor wrapped).
- `/src/styles`: Global CSS and design tokens.
- `/src/App.js`: Main application entry point and routing config.
