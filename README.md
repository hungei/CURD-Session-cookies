# CRUD Session-Cookies Management System

A full-stack web application for managing **Suppliers** and **Products** with complete **Authentication System** using **Session-Cookies**, built with **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features

### 🔐 Authentication System
- **User Registration** with validation
- **User Login/Logout** with session management
- **Password Reset** functionality with email support
- **Session-based Authentication** using cookies
- **Protected Routes** middleware

### 📦 Product Management (CRUD)
- ➕ **Create** new products with supplier association
- 📋 **Read** products list with pagination
- ✏️ **Update** product information
- 🗑️ **Delete** products with confirmation

### 🏢 Supplier Management (CRUD)
- ➕ **Create** new suppliers
- 📋 **Read** suppliers list  
- ✏️ **Update** supplier information
- 🗑️ **Delete** suppliers

### 🎨 User Interface
- **Responsive Design** with Bootstrap 5
- **Modern UI/UX** with card-based layout
- **Form Validation** client & server side
- **Error/Success Messages** handling

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Authentication & Security
- **Express-Session** - Session management
- **Connect-Mongo** - MongoDB session store
- **bcryptjs** - Password hashing
- **Cookie-Parser** - Cookie parsing middleware
- **dotenv** - Environment variables

### Frontend & Templating
- **EJS** - Template engine
- **Bootstrap 5** - CSS framework
- **CSS3** - Custom styling

### Email Service
- **Nodemailer** - Email sending for password reset

## 📁 Project Structure

```
CURD-Session-cookies/
├── app.js                 # Main application entry point
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables (not tracked)
├── .gitignore           # Git ignore rules
├── config/
│   └── session.js       # Session configuration
├── controllers/         # Business logic
│   ├── authController.js
│   ├── productController.js
│   └── supplierController.js
├── middlewares/         # Custom middleware
│   └── auth.js         # Authentication middleware
├── models/             # Database schemas
│   ├── User.js
│   ├── Product.js
│   └── Supplier.js
├── routes/             # Route definitions
│   ├── index.js
│   ├── auth.js
│   ├── products.js
│   └── suppliers.js
├── views/              # EJS templates
│   ├── index.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── forgot.ejs
│   ├── partials/
│   ├── products/
│   └── suppliers/
└── public/             # Static assets
    ├── css/
    ├── js/
    └── images/
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn** package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd CURD-Session-cookies
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/session_cookies_db
   SESSION_SECRET=your_super_secret_session_key_here
   PORT=3000
   
   # Email Configuration (for password reset)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or make sure your MongoDB Atlas is accessible
   ```

5. **Run the application**
   ```bash
   npm start
   # or
   node app.js
   ```

6. **Access the application**
   Open your browser: `http://localhost:3000`

## 🌐 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/login` | Show login form | No |
| POST | `/login` | Process login | No |
| GET | `/register` | Show register form | No |
| POST | `/register` | Process registration | No |
| GET | `/forgot` | Show forgot password form | No |
| POST | `/forgot` | Process forgot password | No |
| POST | `/logout` | Logout user | Yes |

### Supplier Routes  
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/suppliers` | List all suppliers | Yes |
| GET | `/suppliers/new` | Show create form | Yes |
| POST | `/suppliers/new` | Create supplier | Yes |
| GET | `/suppliers/edit/:id` | Show edit form | Yes |
| POST | `/suppliers/edit/:id` | Update supplier | Yes |
| GET | `/suppliers/delete/:id` | Delete supplier | Yes |

### Product Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | List all products | Yes |
| GET | `/products/new` | Show create form | Yes |
| POST | `/products/new` | Create product | Yes |
| GET | `/products/edit/:id` | Show edit form | Yes |
| POST | `/products/edit/:id` | Update product | Yes |
| GET | `/products/delete/:id` | Delete product | Yes |

## 🗃️ Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: now)
}
```

### Supplier Model
```javascript
{
  name: String (required),
  address: String,
  phone: String,
  createdAt: Date (default: now)
}
```

### Product Model
```javascript
{
  name: String (required),
  price: Number (required),
  quantity: Number (required),
  supplierId: ObjectId (ref: Supplier),
  createdAt: Date (default: now)
}
```

## 🔐 Security Features

- **Password Hashing** with bcryptjs
- **Session Management** with secure cookies
- **CSRF Protection** considerations
- **Environment Variables** for sensitive data
- **Input Validation** and sanitization
- **Protected Routes** middleware
- **Secure Session Configuration**

## 🎮 Usage Guide

### Getting Started
1. **Register** a new account at `/register`
2. **Login** with your credentials at `/login`
3. **Manage Suppliers** at `/suppliers`
4. **Manage Products** at `/products` (requires suppliers)
5. **Logout** when done

### Creating Data Flow
1. Create Suppliers first
2. Create Products (select supplier)
3. View/Edit/Delete as needed

## 🔧 Configuration

### Session Configuration
```javascript
{
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore (persistent sessions),
  cookie: { 
    httpOnly: true,
    secure: false, // true for HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}
```

### MongoDB Connection
- **Development:** `mongodb://localhost:27017/session_cookies_db`
- **Production:** Use MongoDB Atlas connection string

## 🧪 Testing

### Manual Testing Workflow
1. Register new user → Login → Access protected routes
2. Create suppliers → Create products → Test CRUD operations  
3. Logout → Verify protection → Login again

### Sample Data
```javascript
// Sample Supplier
{
  name: "Tech Supply Co",
  address: "123 Tech Street, Silicon Valley",
  phone: "+1-555-0123"
}

// Sample Product
{
  name: "Wireless Mouse",
  price: 29.99,
  quantity: 100,
  supplierId: "supplier_id_here"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📜 License

This project is licensed under the ISC License.

## 👥 Author

- **Your Name** - [GitHub Profile](https://github.com/your-username)

## 🐛 Issues & Support

If you encounter issues:
1. Check the `.env` configuration
2. Ensure MongoDB is running
3. Verify all dependencies are installed
4. Check console for error messages

For support, please open an issue in the repository.

---

**Happy Coding! 🚀**