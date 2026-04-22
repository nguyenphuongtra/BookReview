# Book Review Management System

A full-stack web application for managing books, authors, and reviews. The project uses **Spring Boot** for the backend and **React** with **Vite** for the frontend.

## Project Overview

The **Book Review Management System** is a modern system built with a full-stack architecture that enables:

- Manage authors (create, list, update, delete)
- Manage books linked to authors
- Create and view book reviews
- Intuitive and responsive interface with React
- Robust RESTful API with Spring Boot

## Project Architecture

```
book-review-system/
├── backend/                 # Spring Boot API
│   ├── src/
│   │   ├── main/java/      # Java source code
│   │   │   └── com/example/backend/
│   │   │       ├── entity/     # Data models (Book, Author, Review)
│   │   │       ├── repository/ # Data access interfaces
│   │   │       ├── service/    # Business logic
│   │   │       ├── controller/ # API endpoints
│   │   │       └── BackendApplication.java
│   │   └── resources/  # Configuration files
│   ├── pom.xml         # Maven dependencies
│   └── mvnw            # Maven Wrapper
│
├── frontend/            # React + Vite application
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── App.jsx     # Root component
│   │   └── main.jsx    # Entry point
│   ├── package.json    # npm dependencies
│   └── vite.config.js  # Vite configuration
│
└── package.json        # Dependency management (monorepo)
```

## Technologies Used

### Backend
- **Java 21** - Programming language
- **Spring Boot 4.0.5** - Framework for building web applications
- **Spring Data JPA** - Data access and manipulation
- **PostgreSQL** - Relational database
- **Spring Boot Validation** - Data validation
- **Maven** - Dependency management and build tool

### Frontend
- **React 19** - Library for building user interfaces
- **Vite 8** - Modern and fast build tool
- **React Router v7** - Page routing
- **Axios** - HTTP client for API calls
- **Lucide React** - SVG icons
- **ESLint** - Code quality linter

## Data Structure

### Main Entities

#### 1. **Author**
```java
- id (Long) - Unique identifier
- name (String) - Author's name
- books (List<Book>) - Author's books
```

#### 2. **Book**
```java
- id (Long) - Unique identifier
- title (String) - Book title
- author (Author) - Book's author (Relationship: ManyToOne)
- reviews (List<Review>) - Book reviews
```

#### 3. **Review**
```java
- id (Long) - Unique identifier
- rating (Integer) - Review rating
- comment (String) - Review comment
- book (Book) - Reviewed book
```

## How to Run the Project

### Prerequisites

- **Java 21** or higher
- **Node.js** (v18+) and npm
- **PostgreSQL** (v12+)
- **Git**

### 1. Set Up PostgreSQL Database

```bash
# Create database
createdb book_review_db

# Or using psql:
psql -U postgres
CREATE DATABASE book_review_db;
```

### 2. Configure Environment Variables (Backend)

Edit the file `backend/src/main/resources/application.properties`:

```properties
spring.application.name=backend
spring.datasource.url=jdbc:postgresql://localhost:5432/book_review_db
spring.datasource.username=your_postgres_user
spring.datasource.password=your_postgres_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# CORS Configuration
cors.allowed-origins=http://localhost:5173
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
cors.allowed-headers=Content-Type,Authorization
cors.allow-credentials=true
```

### 3. Start the Backend

```bash
cd backend

# Using Maven Wrapper (macOS/Linux)
./mvnw spring-boot:run

# Or on Windows
mvnw.cmd spring-boot:run

# Or using installed Maven
mvn spring-boot:run
```

The backend will be available at: **http://localhost:8080**

### 4. Start the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at: **http://localhost:5173**

## API Endpoints

### Authors
- `GET /api/authors` - List all authors
- `GET /api/authors/{id}` - Get a specific author
- `POST /api/authors` - Create new author
- `PUT /api/authors/{id}` - Update author
- `DELETE /api/authors/{id}` - Delete author

### Books
- `GET /api/books` - List all books
- `GET /api/books/{id}` - Get a specific book
- `POST /api/books` - Create new book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

### Reviews
- `GET /api/reviews` - List all reviews
- `GET /api/reviews/{id}` - Get a specific review
- `POST /api/reviews` - Create new review
- `PUT /api/reviews/{id}` - Update review
- `DELETE /api/reviews/{id}` - Delete review

## Frontend Pages

- **AuthorList** - Author listing
- **AuthorCreate** - Form to create new author
- **BookList** - Book listing
- **BookCreate** - Form to create new book
- **ReviewList** - Review listing
- **ReviewCreate** - Form to create new review

## Development Scripts

### Backend
```bash
cd backend

# Compile the project
./mvnw clean install

# Run tests
./mvnw test

# Build for production
./mvnw clean package
```

### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Development
npm run dev

# Build for production
npm run build

# Preview the build
npm run preview

# Check code quality
npm run lint
```

## Implemented Validations

### Backend
- Required field validation using `@NotBlank` and `@NotNull`
- Descriptive error messages
- Relationships between entities (ManyToOne, OneToMany)
- Cascade delete to maintain referential integrity

### Frontend
- Client-side form validation
- Visual error feedback
- Confirmation before deleting records

## Troubleshooting

### Database connection error
- Verify that PostgreSQL is running
- Confirm credentials in `application.properties`
- Check that the database was created

### Frontend cannot connect to backend
- Ensure the backend is running at `http://localhost:8080`
- Check CORS settings in `application.properties`
- Verify the API URL is correct in axios (frontend)

### Port already in use
```bash
# Kill process on port (macOS/Linux)
lsof -ti :8080 | xargs kill -9

# Change backend port in application.properties
server.port=8081
```

## Folder Structure Explained

```
backend/
  src/
    main/
      java/com/example/backend/
        entity/       → JPA models (Author, Book, Review)
        repository/   → Data access interfaces (Spring Data JPA)
        service/      → Business logic and rules
        controller/   → REST API endpoints
      resources/
        application.properties  → Application configuration

frontend/
  src/
    pages/            → Page components
    assets/           → Images, icons, etc
    App.jsx          → Main component with routes
    main.jsx         → Application entry point
```

## Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is under the MIT license - see the LICENSE file for details.

## Author

- **Nguyễn Phương Trà** - Full-stack development

## Contact

For questions or suggestions, feel free to contact.
email: phuongtra.dev@gmail.com

---

**Last updated:** April 2026

