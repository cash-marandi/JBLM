# Project Documentation: JBLM Quantity Surveyors Website

## 1. Website Overview

The JBLM Quantity Surveyors website is a modern, responsive web application built with Next.js, designed to showcase the services, team, and news of JBLM Quantity Surveyors. It provides a platform for potential clients to learn about the company, its expertise in construction cost management, and to get in touch. The website also features an administrative dashboard for managing content.

## 2. Key Features

*   **Informational Pages:**
    *   **Home:** Landing page introducing JBLM Quantity Surveyors.
    *   **About Us:** Details about the company's history, mission, and values.
    *   **Services:** Comprehensive list of quantity surveying services offered.
    *   **Team:** Introduction to the team members.
    *   **Portfolio:** Display of past projects, filterable by category.
    *   **News:** Blog section for company updates and industry insights.
    *   **Contact Us:** Form for inquiries, with data submission to a MongoDB database.
*   **Authentication:** Simple username/password-based login for the administrative dashboard.
*   **Admin Dashboard:**
    *   **Content Management:** Create, edit, and delete news posts, portfolio items, and team members.
    *   **Image Uploads:** Integration with Cloudinary for image storage.
    *   **AI Content Generation (News):** Integration with n8n webhook for generating news post content based on title and subtitle.
*   **Responsive Design:** Adapts to various screen sizes using Tailwind CSS.
*   **Theme Toggling:** Light and dark mode support.
*   **Chatbot Integration:** Uses an n8n-powered chatbot for customer interaction.

## 3. Technology Stack

*   **Frontend:**
    *   **Next.js:** React framework for building server-rendered and static web applications.
    *   **React:** JavaScript library for building user interfaces.
    *   **TypeScript:** Superset of JavaScript that adds static typing.
    *   **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
    *   **Framer Motion:** Library for animations.
    *   **Shadcn UI:** Reusable UI components built with Radix UI and Tailwind CSS.
*   **Backend (Next.js API Routes):**
    *   **Node.js:** JavaScript runtime.
    *   **Mongoose:** MongoDB object data modeling (ODM) library for Node.js.
    *   **Cloudinary:** Cloud-based image and video management service.
    *   **n8n:** Workflow automation tool (used for news content generation and chatbot).
*   **Database:**
    *   **MongoDB:** NoSQL database for storing application data.

## 4. Folder Structure

The project follows a standard Next.js application structure with clear separation of concerns:

```
.
├── app/                      # Next.js App Router (pages, API routes)
│   ├── api/                  # API routes
│   │   ├── auth/             # Authentication API (login, logout)
│   │   ├── contact/          # Contact form submission API
│   │   ├── db/               # Database connection utility
│   │   ├── generate-news-content/ # API for AI news content generation
│   │   ├── models/           # Mongoose schemas for MongoDB
│   │   ├── news/             # CRUD API for news posts
│   │   ├── portfolio/        # CRUD API for portfolio items
│   │   ├── team/             # CRUD API for team members
│   │   └── upload/           # Image upload API (Cloudinary)
│   ├── dashboard/            # Admin dashboard pages
│   │   ├── news/             # Edit news page
│   │   ├── portfolio/        # Edit portfolio page
│   │   └── team/             # Edit team page
│   ├── login/                # Login page
│   ├── news/                 # News listing and single news post pages
│   ├── portfolio/            # Portfolio listing page
│   ├── posts/                # Blog posts listing page (similar to news)
│   ├── globals.css           # Global CSS styles (Tailwind CSS)
│   ├── layout.tsx            # Root layout for the application
│   └── page.tsx              # Home page
├── components/               # Reusable React components
│   ├── dashboard/            # Components specific to the admin dashboard
│   ├── reusable-components/  # Generic reusable components
│   ├── ui/                   # Shadcn UI components (customized)
│   ├── About.tsx             # About Us section component
│   ├── Contact.tsx           # Contact Us section component
│   ├── Footer.tsx            # Footer component
│   ├── HeroSection.tsx       # Main hero section component
│   ├── MobileNav.tsx         # Mobile navigation component
│   ├── N8nChatbot.tsx        # n8n chatbot integration component
│   ├── Navigation.tsx        # Main navigation bar
│   ├── News.tsx              # News section component (homepage)
│   ├── newsPost.tsx          # Single news post display component
│   ├── Portfolio-cards.tsx   # Portfolio cards for infinite moving effect
│   ├── Portfolio.tsx         # Portfolio section component (homepage)
│   ├── services-cards.tsx    # Service cards for hover effect
│   ├── Services.tsx          # Services section component
│   ├── Team.tsx              # Team section component
│   ├── Theme-provider.tsx    # Theme context provider
│   └── ThemeToggle.tsx       # Theme toggle switch
├── lib/                      # Utility functions and constants
│   ├── constents.ts          # Navigation constants
│   ├── data.ts               # Dummy data (e.g., featured posts)
│   ├── mongoDB.js            # MongoDB connection setup
│   └── utils.ts              # General utility functions (e.g., `cn` for Tailwind)
├── public/                   # Static assets (images, favicons)
├── types/                    # Custom TypeScript type definitions
├── .gitignore                # Git ignore file
├── components.json           # Shadcn UI components configuration
├── googleSheets.js           # (Empty) Placeholder for Google Sheets integration
├── middleware.ts             # Next.js middleware for authentication
├── next.config.ts            # Next.js configuration
├── package-lock.json         # npm dependency lock file
├── package.json              # Project dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
├── README.md                 # Project README
└── tsconfig.json             # TypeScript configuration
```

## 5. Core Components & Functions

### Frontend Components

*   **`app/layout.tsx`**: The root layout of the Next.js application. It sets up the `ThemeProvider`, `Navigation`, `Footer`, and `N8nChatbot`, wrapping all child pages.
*   **`app/page.tsx`**: The main homepage that composes various sections like `HeroSection`, `About`, `Services`, `Team`, `Portfolio`, `News`, and `Contact`.
*   **`components/Navigation.tsx` / `MobileNav.tsx`**: Handle the main navigation bar and its mobile-responsive counterpart, providing links to different sections and pages.
*   **`components/ThemeToggle.tsx` / `Theme-provider.tsx`**: Implement light/dark mode functionality using `next-themes` and Shadcn UI's `Switch` component.
*   **`components/About.tsx`**: Displays information about the company, utilizing `TextGenerateEffect` for animated text and `CometCardDemo` for a visual element.
*   **`components/Services.tsx`**: Showcases the company's services, using `CardHoverEffectDemo` for an interactive display of service categories.
*   **`components/Team.tsx`**: Presents team members using `AnimatedTestimonials` for a dynamic carousel display.
*   **`components/Portfolio.tsx`**: Fetches and displays portfolio items, allowing filtering by category using Shadcn UI `Tabs` and `HoverEffect` for interactive cards.
*   **`components/News.tsx`**: Displays a list of news posts on the homepage, fetching data from the `/api/news` endpoint.
*   **`components/Contact.tsx`**: Provides a contact form that submits data to the `/api/contact` endpoint.
*   **`components/N8nChatbot.tsx`**: Integrates an n8n-powered chatbot by dynamically loading an external script and initializing the chatbot with custom configurations.
*   **`app/login/page.tsx`**: Handles user login, authenticating against `/api/auth/login` and redirecting to the dashboard on success.
*   **`app/dashboard/page.tsx`**: The main administrative dashboard, providing tabs for managing News, Team, and Portfolio content. It fetches and displays existing data and includes forms for adding new entries.
*   **`components/dashboard/NewsForm.tsx` / `PortfolioForm.tsx` / `TeamForm.tsx`**: Forms within the dashboard for creating new news posts, portfolio items, and team members, respectively. They handle form state, image uploads (via `/api/upload`), and data submission to their respective API endpoints.
*   **`app/dashboard/news/[post_id]/edit/page.tsx` / `app/dashboard/portfolio/[portfolio_id]/edit/page.tsx` / `app/dashboard/team/[team_id]/edit/page.tsx`**: Pages for editing existing news posts, portfolio items, and team members. They fetch the specific item's data and render the corresponding `EditForm` component.
*   **`components/dashboard/EditNewsForm.tsx` / `EditPortfolioForm.tsx` / `EditTeamForm.tsx`**: Forms for editing existing content. They pre-fill form fields with existing data, handle updates (including image re-uploads), and submit changes via `PUT` requests to the API.
*   **`components/dashboard/Posts.tsx`**: A reusable component for displaying lists of news, team, or portfolio items within the dashboard, including action buttons for editing and deleting.
*   **`components/dashboard/ActionsButtons.tsx`**: Provides "Edit" and "Delete" buttons for dashboard items, handling navigation to edit pages and API calls for deletion.
*   **`app/news/[post_id]/page.tsx`**: Displays a single news post, fetching its content based on the `post_id` from the URL.
*   **`components/newsPost.tsx`**: Renders the detailed view of a single news post.

### Backend API Routes (`app/api`)

*   **`auth/login/route.ts`**: Handles user login. It checks hardcoded credentials (`admin`/`password`) and sets an `auth` cookie upon successful login.
*   **`auth/logout/route.ts`**: Clears the `auth` cookie, effectively logging out the user.
*   **`contact/route.ts`**: Receives contact form submissions and saves them to the MongoDB `Contact` collection.
*   **`db/connectDB.ts`**: Establishes a connection to the MongoDB database using Mongoose.
*   **`generate-news-content/route.js`**: An API endpoint that sends a news title and subtitle to an n8n webhook to generate news content.
*   **`models/Contact.ts` / `News.js` / `Portfolio.js` / `Team.js`**: Mongoose schemas defining the structure of data stored in MongoDB for contacts, news posts, portfolio items, and team members.
*   **`news/route.js`**: Handles `POST` (create), `GET` (fetch all), and `DELETE` (delete by ID) operations for news posts.
*   **`news/[post_id]/route.js`**: Handles `GET` (fetch by ID) and `PUT` (update by ID) operations for individual news posts.
*   **`portfolio/route.js`**: Handles `POST`, `GET`, `PUT`, and `DELETE` operations for portfolio items.
*   **`team/route.js`**: Handles `POST`, `GET`, `PUT`, and `DELETE` operations for team members.
*   **`upload/route.js`**: Handles image uploads to Cloudinary, returning the secure URL of the uploaded image.

### Utility Functions (`lib`)

*   **`lib/constents.ts`**: Defines an array of navigation items used in the `Navigation` and `MobileNav` components.
*   **`lib/data.ts`**: Contains dummy data for `featuredPosts`, likely used for development or placeholder content.
*   **`lib/mongoDB.js`**: Manages the MongoDB connection, ensuring a single connection instance.
*   **`lib/utils.ts`**: Provides the `cn` utility function, a common pattern in Tailwind CSS projects for conditionally joining class names.
*   **`types/index.ts`**: Defines custom TypeScript types, including `PageProps` for Next.js page components.

### Next.js Configuration

*   **`next.config.ts`**: Configures Next.js, including `remotePatterns` for images from Cloudinary.
*   **`middleware.ts`**: Implements authentication middleware, redirecting unauthenticated users from `/dashboard` routes to the login page.

## 6. Recommendations for Improvements

### Security

1.  **Authentication:**
    *   **Replace Hardcoded Credentials:** The current `admin`/`password` in `app/api/auth/login/route.ts` is a major security vulnerability. Implement a proper user management system with a database to store hashed passwords (e.g., using `bcrypt`).
    *   **Session Management:** Instead of a simple `auth` cookie, consider using more robust session management (e.g., JWTs stored in HttpOnly cookies, or a dedicated session store like Redis) to prevent session hijacking.
    *   **Rate Limiting:** Implement rate limiting on the login endpoint to prevent brute-force attacks.
    *   **Input Validation:** Thoroughly validate all user inputs on both the frontend and backend to prevent injection attacks (e.g., XSS, SQL injection if using a relational database).
2.  **Environment Variables:**
    *   **Strict Validation:** Ensure all environment variables (e.g., `MONG_URI`, Cloudinary credentials, `N8N_WEBHOOK_URL`) are properly validated at application startup to prevent runtime errors.
    *   **Secret Management:** For production, consider using a dedicated secret management service (e.g., Vercel Environment Variables, AWS Secrets Manager, HashiCorp Vault) rather than relying solely on `.env` files.

### Code Quality & Maintainability

1.  **TypeScript Strictness:**
    *   **Enforce Stricter Types:** Continue to enforce stricter TypeScript rules. Many `any` types are still present (e.g., in `News.tsx`, `Portfolio.tsx`, `Team.tsx`, `Posts.tsx`, and various `map` functions). Defining clear interfaces for all data structures will improve code reliability and maintainability.
    *   **API Response Types:** Define explicit TypeScript interfaces for all API responses to ensure type safety when consuming data from the backend.
2.  **Error Handling:**
    *   **Centralized Error Handling:** Implement a more centralized and robust error handling mechanism for API routes and frontend components. Instead of `alert()`, use a more user-friendly notification system (e.g., toast messages).
    *   **Logging:** Enhance server-side logging to capture more detailed error information for debugging and monitoring in production.
3.  **API Consistency:**
    *   **Standardize API Responses:** Ensure all API routes return consistent JSON response structures for success and error states.
    *   **HTTP Status Codes:** Consistently use appropriate HTTP status codes for API responses (e.g., 400 for bad requests, 404 for not found, 401 for unauthorized, 500 for internal server errors).
4.  **Code Duplication:**
    *   **Refactor Forms:** The `NewsForm`, `PortfolioForm`, `TeamForm`, and their `Edit` counterparts share a lot of similar logic (state management, image upload, API calls). Consider creating a generic `CrudForm` component or a custom hook to reduce duplication.
    *   **`fetch` Abstraction:** Abstract the `fetch` calls into a reusable utility function or a custom hook to handle common concerns like loading states, error handling, and content type headers.
5.  **Performance:**
    *   **Image Optimization:** While Cloudinary is used, ensure images are served in optimized formats (e.g., WebP) and at appropriate sizes for different devices. Next.js `Image` component handles this well, but ensure proper usage.
    *   **Data Fetching Strategy:** Review data fetching strategies. For static content, consider using Next.js `getStaticProps` or `getStaticPaths` for better performance. For dynamic content, `getServerSideProps` or client-side fetching with SWR/React Query can be optimized.
    *   **Bundle Size Analysis:** Regularly analyze the JavaScript bundle size to identify and remove unused dependencies or large libraries.
6.  **User Experience (UX):**
    *   **Loading Indicators:** Implement more prominent and user-friendly loading indicators for data fetching and form submissions.
    *   **Form Validation Feedback:** Provide real-time validation feedback on forms (e.g., highlighting invalid fields, displaying error messages next to inputs) to improve the user experience.
    *   **Empty States:** Implement clear empty states for lists (e.g., "No news posts found") when there is no data to display.
    *   **Accessibility (A11y):** Conduct an accessibility audit to ensure the website is usable by individuals with disabilities (e.g., proper ARIA attributes, keyboard navigation, sufficient color contrast).
7.  **Testing:**
    *   **Unit and Integration Tests:** Implement unit tests for React components and utility functions, and integration tests for API routes to ensure functionality and prevent regressions.
    *   **End-to-End Tests:** Consider adding end-to-end tests (e.g., with Cypress or Playwright) to simulate user flows and verify the entire application.

### Deployment & Operations

1.  **CI/CD Pipeline:** Automate the deployment process with a CI/CD pipeline (e.g., GitHub Actions, GitLab CI/CD) to ensure consistent and reliable deployments.
2.  **Monitoring & Alerting:** Set up monitoring for application performance, errors, and uptime. Configure alerts for critical issues.
3.  **Database Backups:** Implement a strategy for regular database backups to prevent data loss.
4.  **Scalability:** As the application grows, consider database indexing, caching strategies, and potentially serverless functions for API routes to improve scalability.

### Feature Enhancements

1.  **Google Sheets Integration:** The `googleSheets.js` and `pages/api/google-sheets.js` files are empty. If Google Sheets integration is intended, complete its implementation.
2.  **News Content Generation:** The `generate-news-content` API currently sends `title` and `subTitle` to n8n. Enhance this to allow more parameters or provide more context for better content generation.
3.  **Rich Text Editor:** For news posts and descriptions, consider integrating a rich text editor (e.g., TinyMCE, Quill) to allow for more formatted content.
4.  **Search Functionality:** Implement a search feature for news and portfolio items to allow users to find specific content more easily.
5.  **Pagination/Infinite Scroll:** For large lists of news or portfolio items, implement pagination or infinite scrolling to improve performance and user experience.
6.  **User Roles:** If more complex user management is needed, implement different user roles (e.g., editor, admin) with varying permissions.
7.  **Contact Form Enhancements:** Add reCAPTCHA or similar spam protection to the contact form.
8.  **Dynamic Navigation:** Consider making `NavItems` configurable from the backend if the navigation structure needs to change frequently.
