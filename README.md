# Aggie Agenda

A smart productivity platform for students that automatically transforms syllabi into organized Google Calendar events. Never miss another assignment deadline or important date.

## Overview

Aggie Agenda streamlines academic planning by parsing your course syllabi and seamlessly integrating assignments, deadlines, and events directly into your Google Calendar. Built with modern web technologies to provide a fast, reliable experience.

### Tech Stack

- **Frontend:** React + Vite
- **Backend:** Django + Django REST Framework
- **Integration:** Google Calendar API

## Project Structure

```
App/
├── Backend/
│   ├── api/                 # REST API endpoints
│   ├── login/               # Authentication
│   ├── staticfiles/         # Static assets
│   ├── manage.py
│   ├── requirements.txt
│   └── README.md
│
└── Frontend/
    ├── src/                 # React components and pages
    ├── public/              # Static assets
    ├── index.html
    └── README.md
```

## Quick Start

### Prerequisites

- Python 3.10 or higher
- Node.js and npm
- [Google Calendar API credentials](https://developers.google.com/calendar/quickstart/js)

### Backend Setup

```bash
# Navigate to backend directory
cd App/Backend

# Create and activate virtual environment
python -m venv ../app_env
source ../app_env/bin/activate  # Mac/Linux
# or
../app_env/Scripts/activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Create a .env file in the Backend directory with your credentials

# Start the server
python manage.py runserver
```

The backend will run on `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd App/Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## How It Works

1. Open the app in your browser at `http://localhost:5173`
2. Log in with your Google account
3. Upload your course syllabus (PDF or compatible format)
4. Review the extracted events and dates
5. Confirm to sync with your Google Calendar


## License

License - see [LICENSE](LICENSE) for details

---

**Need help?** Check the individual README files in the Backend and Frontend directories for more detailed setup instructions.
