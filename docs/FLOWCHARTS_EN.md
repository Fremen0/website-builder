# Project Flowcharts

This document contains the main flowcharts for the **Website Builder** project, illustrating the interactions between different components and roles within the system.

---

## 1. System Architecture

This diagram shows the relationship between the User, React Frontend, Node.js Server, and MongoDB Database.

```mermaid
graph TD
    User((User))
    UI[Frontend - React]
    Server[Backend - Node.js/Express]
    DB[(Database - MongoDB)]
    Storage[File Store - Uploads Folder]

    User <--> UI
    UI <-->|API Calls / JSON| Server
    Server <-->|Mongoose| DB
    Server <-->|File Stream| Storage
```

![System Architecture](./images/system_architecture_en.png)

---

## 2. Authentication Flow

Illustrates how users access the system and verify their identity.

```mermaid
sequenceDiagram
    participant User as User
    participant Client as Client (React)
    participant Server as Server (API)
    participant DB as Database

    User->>Client: Enter Credentials
    Client->>Server: Send (Email, Password)
    Server->>DB: Find User
    DB-->>Server: User Data (or Error)
    Server-->>Server: Verify Password & Generate JWT
    Server-->>Client: Return Token + User Info
    Client-->>Client: Save Token (localStorage/Context)
    Client->>User: Grant Access to Dashboard
```

---

## 3. Editor Logic Flow

Shows how the "Drag and Drop" builder works on the client side.

```mermaid
flowchart LR
    Start([Start Editing]) --> Sidebar[Component Sidebar]
    Sidebar --> Drag{Drag Component}
    Drag --> Canvas[Canvas Workspace]
    Canvas --> Select{Select Component}
    Select --> Properties[Modify Properties - Color, Text, Image]
    Properties --> State[Update Editor State]
    State --> Preview[Live Preview]
    Preview --> Save([Save Project])
```

![Editor Logic Flow](./images/editor_logic_en.png)

---

## 4. Project Saving Workflow

The transition of data from the store state to persistent storage.

```mermaid
graph TD
    State[Editor State - JSON] --> Payload[Create Data Payload]
    Payload --> API[POST/PUT to /api/projects]
    API --> Middleware[Auth/Token Verification]
    Middleware --> Controller[Process Request]
    Controller --> DB_Find{Does Project Exist?}
    DB_Find -- Yes --> Update[Update Record]
    DB_Find -- No --> Create[Create New Record]
    Update --> Response(Return Success/Fail)
    Create --> Response
    Response --> UI[Refresh UI State]
```

![Project Saving Workflow](./images/save_workflow_en.png)

---

## 5. Media Upload Flow

```mermaid
flowchart TD
    A[Select Image in Editor] --> B{Upload New File?}
    B -- Yes --> C[Send FormData to /api/upload]
    C --> D[Server receives file - Multer]
    D --> E[Save to Local Storage]
    E --> F[Return Asset URL]
    B -- No --> G[Enter External URL]
    F --> H[Update Component Image Prop]
    G --> H
```
