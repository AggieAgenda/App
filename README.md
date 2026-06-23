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

### Local Development

Run the backend and frontend in separate terminals.

Backend setup:

- Environment example: [Backend/.env.example](Backend/.env.example)
- Setup docs: [Backend/README.md](Backend/README.md)

```bash
cd Backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

The backend will run on `http://localhost:8000`

Frontend setup:

- Environment example: [Frontend/.env.example](Frontend/.env.example)
- Setup docs: [Frontend/README.md](Frontend/README.md)

```bash
cd Frontend
npm install
cp .env.example .env
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
