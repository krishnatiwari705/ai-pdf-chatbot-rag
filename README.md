# 🤖 AI PDF RAG Chatbot

A full-stack AI-powered PDF chatbot that allows users to upload PDF documents and ask questions about their content through a conversational interface.

The application uses a **Retrieval-Augmented Generation (RAG)** pipeline to retrieve relevant information from uploaded documents and generate context-aware answers using Google's Gemini models.

---

## ✨ Features

- 🔐 User registration and login
- 🔑 JWT-based authentication
- 📄 PDF document upload
- 📝 PDF text extraction
- ✂️ Document text chunking using LangChain
- 🧠 Text embeddings
- 🔎 Semantic vector search with Pinecone
- 🤖 Gemini-powered RAG responses
- 💬 Persistent conversation history
- 🗂️ Multiple independent conversations
- 🏷️ Automatic conversation titles
- 🗑️ Delete conversations
- 🔄 Messages persist when switching between conversations
- 💾 MongoDB persistence
- ☁️ Cloudinary integration
- 🎨 Modern React interface
- 📱 Responsive chat interface
- 🌐 REST API architecture
- 🚀 Frontend deployed on Vercel
- 🚀 Backend deployed on Render

---

# 🧠 How the Application Works

The application follows a Retrieval-Augmented Generation architecture.

```text
                    USER
                     │
                     ▼
             ┌─────────────────┐
             │ React Frontend  │
             │     Vercel      │
             └────────┬────────┘
                      │
                  REST API
                      │
                      ▼
             ┌─────────────────┐
             │ Node.js/Express │
             │     Render      │
             └───────┬─────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
    ┌───────────┐        ┌──────────────┐
    │  MongoDB  │        │   RAG Flow   │
    │           │        │              │
    │ Users     │        │  Embeddings  │
    │ Chats     │        │      ↓       │
    │ Messages  │        │   Pinecone   │
    │ Documents │        │      ↓       │
    └───────────┘        │   Context    │
                         │      ↓       │
                         │   Gemini     │
                         └──────────────┘
📄 PDF Processing Pipeline

When a user uploads a PDF, the backend processes it through the following pipeline:

PDF Upload
    │
    ▼
PDF Text Extraction
    │
    ▼
Text Chunking
    │
    ▼
Generate Embeddings
    │
    ▼
Store Vectors in Pinecone

Each chunk is stored with metadata such as:

Document ID
Conversation ID
User ID
Original chunk text

This allows retrieved chunks to be associated with the correct document and conversation.

💬 RAG Question Answering

When a user asks a question:

User Question
      │
      ▼
Generate Query Embedding
      │
      ▼
Pinecone Similarity Search
      │
      ▼
Retrieve Relevant Chunks
      │
      ▼
Build Context
      │
      ▼
Context + Question
      │
      ▼
Gemini
      │
      ▼
AI Answer

The Gemini service is instructed to answer using the retrieved document context.

If the required information cannot be found in the retrieved context, the application instructs the model to indicate that the answer could not be found in the uploaded document.

🛠️ Technology Stack
Frontend
React
Vite
Tailwind CSS
Axios
React Router
React Hot Toast
Backend
Node.js
Express.js
REST APIs
JWT
Multer
Database
MongoDB
Mongoose
AI / RAG
Google Gemini
LangChain
Vector Embeddings
Pinecone
File Storage
Cloudinary
Deployment
Vercel
Render
📁 Project Structure
ai-backend/
│
├── server.js
├── package.json
├── package-lock.json
├── vercel.json
├── .env
│
├── src/
│   │
│   ├── app.js
│   │
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── pinecone.js
│   │
│   ├── controllers/
│   │   ├── ai.controller.js
│   │   ├── auth.controller.js
│   │   ├── conversation.controller.js
│   │   ├── document.controller.js
│   │   ├── message.controller.js
│   │   └── rag.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── multer.middleware.js
│   │   └── upload.middleware.js
│   │
│   ├── models/
│   │   ├── chat.js
│   │   ├── Conversation.js
│   │   ├── Document.js
│   │   ├── Message.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── ai.routes.js
│   │   ├── auth.routes.js
│   │   ├── conversation.routes.js
│   │   ├── document.routes.js
│   │   ├── message.routes.js
│   │   └── rag.routes.js
│   │
│   ├── services/
│   │   ├── chunk.service.js
│   │   ├── embedding.service.js
│   │   ├── gemini.service.js
│   │   ├── pdf.service.js
│   │   └── pinecone.service.js
│   │
│   └── utils/
│       └── uploadToCloudinary.js
│
└── ai-frontend/
    │
    ├── package.json
    ├── vite.config.js
    ├── index.html
    │
    └── src/
        │
        ├── api/
        │   └── axios.js
        │
        ├── components/
        │   ├── Sidebar.jsx
        │   ├── ChatBox.jsx
        │   ├── Message.jsx
        │   └── ...
        │
        ├── context/
        │   ├── AuthContext.jsx
        │   └── ConversationContext.jsx
        │
        ├── hooks/
        │   └── useConversations.js
        │
        ├── pages/
        │   ├── Dashboard.jsx
        │   ├── Login.jsx
        │   └── Register.jsx
        │
        ├── App.jsx
        ├── App.css
        └── index.css
🔌 API Endpoints

The backend API is prefixed with:

/api/v1
Authentication
POST /api/v1/auth/register
POST /api/v1/auth/login

GET  /api/v1/auth/profile
PUT  /api/v1/auth/profile
PUT  /api/v1/auth/change-password

Protected endpoints use:

Authorization: Bearer <JWT_TOKEN>
Conversations
POST   /api/v1/conversations
GET    /api/v1/conversations
GET    /api/v1/conversations/:id
DELETE /api/v1/conversations/:id

Conversation functionality includes:

Creating conversations
Listing conversations
Selecting conversations
Persistent conversation history
Deleting conversations
Documents
POST /api/v1/document/upload

The endpoint accepts the PDF through the multipart form-data field:

file

The document is associated with the authenticated user and selected conversation.

Messages
GET /api/v1/messages/:conversationId

Returns messages belonging to a specific conversation.

This allows the frontend to maintain separate histories for different chats.

RAG
POST /api/v1/rag/ask

Example request:

{
  "conversationId": "conversation_id",
  "question": "What is the main topic of this document?"
}

The backend retrieves relevant document chunks from Pinecone and sends the retrieved context to Gemini to generate the answer.

🔐 Environment Variables

The backend requires environment variables for the external services used by the application.

Create a .env file in the backend root.

Example:

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

PINECONE_API_KEY=your_pinecone_api_key

PINECONE_INDEX=your_pinecone_index

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Use the exact variable names configured in your project.

Never commit .env or API keys to GitHub.

💻 Running the Project Locally
1. Clone the repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ai-backend
2. Install backend dependencies
npm install
3. Configure environment variables

Create:

.env

in the backend root and add the required credentials.

4. Start the backend
npm run dev

The backend runs locally on:

http://localhost:5000
🎨 Frontend Setup

Open another terminal:

cd ai-frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

The Vite development server will display the local frontend URL in the terminal.

🔄 Conversation System

Each user can maintain multiple independent conversations.

User
 │
 ├── Conversation A
 │      ├── User Message
 │      ├── AI Response
 │      └── User Message
 │
 ├── Conversation B
 │      ├── User Message
 │      └── AI Response
 │
 └── Conversation C
        ├── User Message
        └── AI Response

Switching between conversations loads the messages belonging to the selected conversation.

This prevents messages from one conversation from appearing inside another.

🗑️ Conversation Deletion

When a conversation is deleted:

Delete Conversation
        │
        ▼
Delete Messages
        │
        ▼
Delete Conversation
        │
        ▼
Remove from Frontend

The deletion is restricted to the authenticated user's own conversations.

🌐 Deployment
Frontend

The frontend is deployed using:

Vercel

The frontend communicates with the production backend through the configured production API endpoint.

Backend

The backend is deployed using:

Render

Production API:

https://ai-pdf-chatbot-rag-zd0i.onrender.com/api/v1
🎯 Technical Highlights

This project demonstrates practical experience with:

Full-stack JavaScript development
React component architecture
React Context API
REST API development
JWT authentication
MongoDB data modeling
Mongoose
File uploads
PDF processing
LangChain text splitting
Embeddings
Vector databases
Pinecone similarity search
Retrieval-Augmented Generation
Gemini LLM integration
Persistent conversational state
Cloudinary
CORS
Vercel deployment
Render deployment
🚧 Future Improvements

Possible future improvements include:

Streaming AI responses
Multiple PDFs per conversation
Document preview
Source citations for retrieved chunks
Conversation search
Chat export
RAG evaluation metrics
Retrieval quality improvements
Rate limiting
More advanced document management
Improved authentication and authorization
👨‍💻 Author

Krishna Tiwari

B.Tech Computer Science Engineering

⭐ Project

If you found this project useful, consider giving the repository a star.


### One important correction

I would **not** put your real Gemini, Pinecone, MongoDB, JWT, or Cloudinary values into the README. Keep only placeholder names as above.

Also, because your actual production frontend currently uses the Render backend directly in `axios.js`, the README's deployment section accurately describes the deployed architecture without exposing any credentials.

**This is now a proper portfolio README**, not just a generic template. It explains the exact parts you've actually built: PDF processing → chunking → embeddings → Pinecone → RAG → Gemini → persistent conversations.
