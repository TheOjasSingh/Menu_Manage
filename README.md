# Menu Management Backend

## Overview
This project is a Node.js backend server for managing a menu, with categories, subcategories, and items.

## Setup
1. Clone the repository.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### Categories
- Create Category: `POST /categories`
- Get All Categories: `GET /categories`
- Get Category by ID: `GET /categories/:id`
- Edit Category: `PATCH /categories/:id`

### SubCategories
- Create SubCategory: `POST /subcategories/:categoryId`
- Get All SubCategories: `GET /subcategories`
- Get SubCategories by Category: `GET /subcategories/category/:categoryId`
- Get SubCategory by ID: `GET /subcategories/:id`
- Edit SubCategory: `PATCH /subcategories/:id`

### Items
- Create Item: `POST /items/:parentType/:parentId`
- Get All Items: `GET /items`
- Get Items by Category: `GET /items/category/:categoryId`
- Get Items by SubCategory: `GET /items/subcategory/:subCategoryId`
- Get Item by ID: `GET /items/:id`
- Edit Item: `PATCH /items/:id`
- Search Items by Name: `GET /items/search/:name`

## Database
MongoDB is used for data storage.

## Questions
1. **Database Choice:**
   - **MongoDB:** Chosen for its flexibility with hierarchical data and JSON-like documents.

2. **Learnings:**
   - CRUD operations with MongoDB.
   - Structuring a Node.js project with Express.
   - Middleware for handling asynchronous operations.

3. **Challenges:**
   - Setting up relationships between categories, subcategories, and items.
   - Ensuring data integrity and validation.

4. **Improvements:**
   - Implement more comprehensive error handling.
   - Add authentication and authorization for API endpoints.
   - Optimize database queries and indexing.

