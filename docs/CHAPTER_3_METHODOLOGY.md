# Chapter Three: Design and Implementation (Methodology)

## 3.1 Design and Implementation
The methodology adopted for this project revolves around modern web development practices, specifically utilizing a component-based architecture via React.js and a robust backend using the MERN stack (MongoDB, Express.js, React, Node.js).
The primary design philosophy of the website builder is to offer a "Hybrid Capabilities" model. Traditional builders generally fall into two categories: strict grid/flow-based (like Webflow) and absolutely free-drag (like Wix). In this system, both approaches are synthesized. Why was this done? To provide advanced users with the structured capabilities of CSS Flexbox and Grid for responsive sections while still retaining the freedom to drag and drop overlapping elements absolutely using X and Y coordinates.

## 3.2 General Structure
The system's architecture follows a classic Client-Server (Frontend-Backend) model:

- **Frontend (Client)**: Built exclusively as a Single Page Application (SPA). The state of the entire project (including multiple pages, nested HTML components, and deeply modified CSS styles) is held in memory using React Hooks (`useState`, `useCallback`, `useEffect`). Global context providers (`AuthContext`, `DndProvider`) wrap the application to manage session states and drag-and-drop contexts efficiently.
- **Backend (Server)**: A Node.js environment running Express handles RESTful API requests. The choice to use a NoSQL database (MongoDB) was critical here. Since a user's website layout is essentially a massive, varying JSON tree containing elements and their styles, saving this data in rigid SQL tables would require complex, slow joins. MongoDB naturally accepts these JSON structures directly into the `Project` collection (`data` field), making load and save operations remarkably fast.

### 3.2.1 Stateless Authentication (JWT)
To secure the Client-Server communication without degrading the performance of the SPA, Stateless Authentication using JSON Web Tokens (JWT) was implemented. Unlike traditional Session-ID approaches that force the server to repeatedly query the database (increasing server overhead), JWTs carry the user's verified claims (like `userId`) inside a cryptographically signed payload [14]. This ensures data integrity and scalability, allowing the frontend to quickly verify user sessions mathematically without waiting on database latency [15].

Communication between the two layers occurs asynchronously via Axios, with an automated debounced saving mechanism introduced on the frontend to prevent data loss without overwhelming the server with continuous requests on every pixel movement.

## 3.3 User Interfaces and Pages

The application is heavily modularized, rendering different "pages" or "views" based on user interaction securely bounded by authentication.

### 3.3.1 User Page (Authentication and Dashboard)
Access to the builder tool requires user identification. The `AuthPage` serves as the gateway, handling user registration and login securely. 

<div align="center">
  <img src="../assets/images/auth-page.png" alt="Screenshot 3.1: User Authentication Page" width="80%">
  <br>
  <em>Screenshot 3.1: User Authentication and Registration Interface</em>
</div>

- **Design Justification**: We implemented an authentication barrier (via `PrivateRoute` bindings) because website data is persistent and personal. By tying a `userId` to a `Project` document in MongoDB, the system ensures data privacy and allows users to seamlessly resume their work from any device. A dropdown User Menu was also designed to give quick access to account details and sign-out functionality.

### 3.3.2 Editor Page
The core workspace (`Editor.js`) is the most computationally heavy page in the system. It is divided into three functional zones:
1. **The Sidebar/Toolbar**: Contains draggable elements categorized logically (Basic, Media, Sections) and a Page Manager. The Page Manager allows users to add, rename, or delete multiple sub-pages (e.g., Home, Contact) within a single project, dynamically updating the React state without refreshing the browser.
2. **The interactive Canvas**: Acts as the drop zone (`useDrop`). It calculates exact mouse coordinates, applying an optional "Grid Snapping" math algorithm to align elements perfectly.
3. **The Properties Panel**: A dynamic panel that reflects the CSS properties of the currently selected element. 

<div align="center">
  <img src="../assets/images/editor-overview.png" alt="Screenshot 3.2: Editor Interface Overview" width="90%">
  <br>
  <em>Screenshot 3.2: Full Editor Workspace Structure (Sidebar, Canvas, Properties)</em>
</div>

- **Design Justification**: To improve User Experience (UX), a floating toolbar was implemented over selected elements, allowing quick actions like duplication or deletion without having to travel across the screen to the sidebar. Furthermore, an Undo/Redo stack (`history` and `future` states) was explicitly built to track changes to the canvas state, forgiving user mistakes instantly.

### 3.3.3 Preview Page (Mode)
Rather than redirecting the user to a completely separate URL to view their site, a `previewMode` state toggle is built directly into the Editor. 

<div align="center">
  <img src="../assets/images/preview-mode.png" alt="Screenshot 3.3: Preview Mode Interface" width="80%">
  <br>
  <em>Screenshot 3.3: Preview Mode simulating final website rendering</em>
</div>

- **Design Justification**: Activating Preview Mode completely hides the sidebar, properties panel, bounding boxes, and grid lines. This decision was made to drastically reduce the feedback loop time. The user can see the exact, final rendered HTML/CSS output instantly, assessing responsive design modes (Desktop, Tablet, Mobile) without the heavy loading times of a traditional external preview link.

### 3.3.4 Templates Page (Template Gallery)
The Template Gallery is integrated as a modal/overlay page that presents users with pre-designed layouts. 

<div align="center">
  <img src="../assets/images/template-gallery.png" alt="Screenshot 3.4: Template Gallery Modal" width="80%">
  <br>
  <em>Screenshot 3.4: The internal Template Gallery selection screen</em>
</div>

- **Design Justification**: Analyzing user retention in drag-and-drop builders revealed that users often face "blank canvas paralysis." By providing a database-driven `TemplateCollection`, users can inject professionally designed, pre-built component arrays directly into their workspace. This jumpstarts the design process and acts as a learning tool for how complex grids and flexboxes can be constructed.

### 3.3.5 About Page
The `AboutPage` serves as informational and instructional documentation accessible directly from the application workspace.
- **Design Justification**: Instead of hosting documentation externally, placing the About page within the SPA routing ensures that users can quickly learn about system capabilities, keyboard shortcuts, or project details without disrupting their session flow or losing their unsaved progress.

## 3.4 State Management and Algorithmic Logic

### 3.4.1 React State Management
Handling the state of an entire website layout within a browser's memory is computationally expensive. The state of the project (multiple pages, nested HTML components, and deeply modified CSS properties) is held using React Hooks (`useState`, `useCallback`) and Global Contexts. Instead of using heavy global stores like Redux, which increase bundle size and memory footprint, the local component tree manages the updates.
The use of the Virtual DOM ensures that when a user drags an element or types in a text box, React only re-renders the specific component (`CanvasItem`) that changed, preserving the 60-FPS smoothness required for a dragging interface [16].

### 3.4.2 Grid Snapping and Drop Calculations
The drag-and-drop mechanism is not purely visual; it involves an underlying spatial algorithm. When a user drags an element, the `useDrop` hook calculates the exact pointer coordinates `(X, Y)` relative to the `Canvas` bounding box. To ensure structural alignment, a Grid Snapping algorithm intercepts these coordinates before rendering:
`x = Math.round(x / gridSize) * gridSize`
This mathematical coercion forces randomly dragged elements into a strict, invisible geometric grid (e.g., 10px by 10px), eliminating the misalignment issues commonly found in absolute free-drag editors.

## 3.5 References
[14] J. Nurmi et al., "A JSON Token-Based Authentication and Access Management Schema for Cloud SaaS Applications," *IEEE Xplore*, 2017.
[15] R. M. Ahmed and M. Mahmood, "An authentication based scheme for applications using JSON web token," *ResearchGate/IEEE*, 2019.
[16] V. M. Ganeshan, "Web Development Using ReactJS: Virtual DOM Performance in SPAs," *2023 5th International Conference on Advances in Computing (ICAC3N)*, 2023.
