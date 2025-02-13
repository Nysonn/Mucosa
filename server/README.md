# Django REST API Platform

A comprehensive Django REST Framework-based platform with multiple microservices, including news management, career resources, project portfolios, team information, and event handling.

## 🚀 Features

### Authentication & Security
- ✅ JWT Authentication with token refresh
- ✅ Role-based access control
- ✅ Rate limiting and throttling
- ✅ CORS support

### Performance & Scalability
- ✅ Redis caching
- ✅ Database query optimization
- ✅ Efficient pagination
- ✅ Database indexing

### Core Functionalities
- ✅ News Management System
- ✅ Career Development Platform
- ✅ Project Portfolio
- ✅ Team & About Information
- ✅ Events Management
- ✅ Contact System

### Developer Experience
- ✅ Swagger/OpenAPI Documentation
- ✅ Environment Configuration
- ✅ Comprehensive Testing Suite
- ✅ Code Quality Tools

## 🛠 Tech Stack

- **Framework**: Django 5.1+
- **API**: Django REST Framework
- **Database**: PostgreSQL
- **Caching**: Redis
- **Documentation**: drf-yasg (Swagger/OpenAPI)
- **Authentication**: JWT (Simple JWT)
- **Testing**: Django REST Framework TestCase

## 📋 Prerequisites

- Python 3.8+
- PostgreSQL
- Redis
- Virtual Environment

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/platform-api.git
cd platform-api
```

### 2. Set Up Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Required environment variables:
- `DJANGO_SECRET_KEY`: Your secret key
- `DJANGO_DEBUG`: Set to 'True' for development
- `DJANGO_ALLOWED_HOSTS`: Comma-separated hosts
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string

### 5. Database Setup

```bash
python manage.py migrate
python manage.py createsuperuser
```

### 6. Run Development Server

```bash
python manage.py runserver
```

## 📚 API Documentation

Access interactive API documentation at:

- Swagger UI: `http://localhost:8000/swagger/`
- ReDoc: `http://localhost:8000/redoc/`

Available endpoints:
- News API: `/news/`
- Projects API: `/projects/`
- Career API: `/career/`
- Events API: `/events/`
- About API: `/about/`

## 🧪 Testing

### Run All Tests

```bash
python manage.py test
```

### Run Specific App Tests

```bash
python manage.py test apps.news
python manage.py test apps.projects
python manage.py test apps.career
python manage.py test apps.events
python manage.py test apps.about
```

## 📁 Project Structure

```
platform-api/
├── apps/
│   ├── news/          # News management
│   ├── projects/      # Project portfolio
│   ├── career/        # Career resources
│   ├── events/        # Event management
│   └── about/         # Team & contact
├── config/
│   ├── settings.py    # Project settings
│   ├── urls.py        # Main URL routing
│   └── wsgi.py        # WSGI configuration
├── requirements/
│   ├── base.txt       # Base requirements
│   ├── dev.txt        # Development requirements
│   └── prod.txt       # Production requirements
├── .env.example       # Environment variables template
├── manage.py          # Django management script
└── README.md          # Project documentation
```

## 🔒 Security

- JWT token authentication
- Rate limiting: 100 requests/day for anonymous users, 1000 requests/day for authenticated users
- CORS configuration
- Secure password validation
- Protected API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/platform-api](https://github.com/yourusername/platform-api)
