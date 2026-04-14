
# Web Application Analysis Report

## 1. Overview

The project is a full-stack web application for a company named "JBLM Quantity Surveyors." It serves as a company portfolio, blog, and client interaction platform. The application features a public-facing website and a protected dashboard for content management.

## 2. Technologies Used

### 2.1. Frontend

*   **Framework:** [Next.js](https://nextjs.org/) (using the App Router) with [React](https://react.dev/).
*   **Styling:**
    *   [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
    *   [next-themes](https://github.com/pacocoursey/next-themes): For theme management (e.g., light/dark mode).
    *   `clsx` & `tailwind-merge`: Utility libraries for constructing dynamic and conflict-free class names.
*   **UI Components:**
    *   **Custom Components:** A rich set of custom components is located in the `components/` directory. This includes standard components like `Navigation` and `Footer`, as well as more advanced, visually interesting components such as `animated-testimonials`, `card-hover-effect`, and `infinite-moving-cards`.
    *   **Radix UI:** A library of unstyled, accessible UI primitives is used for components like dialogs, labels, switches, and tabs.
    *   **Icons:** [Lucide React](https://lucide.dev/) is used for a clean and consistent icon set.
*   **Animation:**
    *   [Framer Motion](https://www.framer.com/motion/): A popular library for creating animations in React.
*   **Chatbot:**
    *   `@n8n/chat`: A library for embedding an n8n chatbot into the application.

### 2.2. Backend

*   **Framework:** [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers).
*   **Database:**
    *   [MongoDB](https://www.mongodb.com/): A NoSQL database used for data persistence.
    *   [Mongoose](https://mongoosejs.com/): An Object Data Modeling (ODM) library for MongoDB and Node.js, used to define schemas for `News`, `Portfolio`, `Team`, and `Contact` data.
*   **Authentication:** A custom, cookie-based authentication mechanism is implemented using `middleware.ts` to protect the `/dashboard` routes.
*   **File Storage:**
    *   [Cloudinary](https://cloudinary.com/): The `cloudinary` package and Next.js image configuration suggest that Cloudinary is used for hosting and delivering images.
*   **Google Sheets Integration:** The `googleapis` and `google-auth-library` packages indicate an integration with Google Sheets, which could be used for various purposes, such as data collection from forms or as a simple database.

## 3. Application Structure and Functionality

### 3.1. Public-Facing Website

*   **`app/page.tsx`**: The main landing page, which is composed of several sections:
    *   `HeroSection`: The main header and call-to-action.
    *   `About`: Information about the company.
    *   `Services`: A description of the services offered.
    *   `Team`: Profiles of the team members.
    *   `Portfolio`: A showcase of the company's work.
    *   `News`: A section for the latest news or blog posts.
    *   `Contact`: A contact form.
*   **`app/news/`**: A page to display a list of news articles.
*   **`app/news/[post_id]/`**: A dynamic page to display a single news article.
*   **`app/portfolio/`**: A page to display the company's portfolio.

### 3.2. Admin Dashboard

*   **`app/dashboard/`**: A protected area for managing the website's content.
*   **Authentication:** Access to the dashboard is restricted by a cookie-based authentication system. If a user is not authenticated, they are redirected to the `/login` page.
*   **Content Management:** The dashboard contains forms for creating, editing, and deleting:
    *   News articles (`/dashboard/news/`)
    *   Portfolio items (`/dashboard/portfolio/`)
    *   Team members (`/dashboard/team/`)

### 3.3. API Routes

The backend functionality is exposed through a set of API routes:

*   `/api/auth/login` & `/api/auth/logout`: Handles user authentication.
*   `/api/contact`: Processes submissions from the contact form.
*   `/api/news`: Provides CRUD (Create, Read, Update, Delete) operations for news articles.
*   `/api/portfolio`: Provides CRUD operations for portfolio items.
*   `/api/team`: Provides CRUD operations for team members.
*   `/api/upload`: Handles file uploads, likely to Cloudinary.
*   `/api/generate-news-content`: An intriguing endpoint that may leverage an AI service to automatically generate content for news articles.

## 4. Summary

This is a well-structured, modern web application that leverages the full-stack capabilities of Next.js. It features a clean, component-based architecture, a secure backend, and a rich, interactive user interface. The use of a headless CMS-like structure with a separate dashboard for content management is a common and effective pattern for this type of application. The integration of a chatbot and a potential AI content generator makes it a particularly interesting and feature-rich project.
