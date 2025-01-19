# Text Analyzer Tool

A brief description of the project and its purpose.

## Prerequisites

Before setting up the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (for managing Node.js packages)
- [Docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/install/linux/)

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/Nil20/text-analyzer-tool
cd .
```

### 2. Install dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 3. Environment Variables

Make sure to create a `.env` file in the root of the project with the following (adjust values as needed):

```
DB_HOST=db
DB_USER=root
DB_PASSWORD=root_passwords
DB_NAME=text_analyzer_db
```

### 4. Running the project

You can run the project using the following scripts:

#### Development Server

To run the development server for the first time, use:

```bash
npm run setup
```

To run the development server after running once, use:

```bash
npm run dev
```

They will start the development server locally at [http://localhost:3000](http://localhost:3000).

#### Running Tests

To run your tests using Jest or other test frameworks, use:

```bash
npm run test
```

This will run all defined tests.

#### Resetting the Database (Optional)

To reset the database and remove any persisted data, you can use:

```bash
npm run clear
```

This will stop the containers and remove associated volumes.

### 6. Accessing the application

Once the project is running, access the frontend at:

- **Frontend:** [http://localhost:3000](http://localhost:3000)

### 7. API List

Once the project is running, the following APIs should be available for use:

#### 1. **POST /api/number-of-words**

- **Description**: Returns the number of words in the provided text.
- **Request Body**:
  ```json
  {
    "content": "Your input text here"
  }
  ```
- **Response**:
  - **201**: Returns the word count.
  ```json
  {
    "wordCount": 4
  }
  ```
  - **400**: Invalid content.
  ```json
  {
    "error": "Invalid content. Please provide a string."
  }
  ```
  - **500**: Internal server error.
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

#### 2. **POST /api/number-of-characters**

- **Description**: Returns the number of characters in the provided text.
- **Request Body**:
  ```json
  {
    "content": "Your input text here"
  }
  ```
- **Response**:
  - **201**: Returns the character count.
  ```json
  {
    "characterCount": 17
  }
  ```
  - **400**: Invalid content.
  ```json
  {
    "error": "Invalid content. Please provide a string."
  }
  ```
  - **500**: Internal server error.
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

#### 3. **POST /api/number-of-sentences**

- **Description**: Returns the number of sentences in the provided text.
- **Request Body**:
  ```json
  {
    "content": "Your input text here"
  }
  ```
- **Response**:
  - **201**: Returns the sentence count.
  ```json
  {
    "sentenceCount": 1
  }
  ```
  - **400**: Invalid content.
  ```json
  {
    "error": "Invalid content. Please provide a string."
  }
  ```
  - **500**: Internal server error.
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

#### 4. **POST /api/number-of-paragraphs**

- **Description**: Returns the number of paragraphs in the provided text.
- **Request Body**:
  ```json
  {
    "content": "Your input text here"
  }
  ```
- **Response**:
  - **201**: Returns the paragraph count.
  ```json
  {
    "paragraphCount": 1
  }
  ```
  - **400**: Invalid content.
  ```json
  {
    "error": "Invalid content. Please provide a string."
  }
  ```
  - **500**: Internal server error.
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

#### 5. **POST /api/longest-words**

- **Description**: Returns the longest words from the provided text.
- **Request Body**:
  ```json
  {
    "content": "Your input text here"
  }
  ```
- **Response**:
  - **201**: Returns the longest words.
  ```json
  {
    "longestWords": ["input"]
  }
  ```
  - **400**: Invalid content.
  ```json
  {
    "error": "Invalid content. Please provide a string."
  }
  ```
  - **500**: Internal server error.
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

These APIs provide various text analysis capabilities such as counting words, characters, sentences, paragraphs, and finding the longest words in the input content.
