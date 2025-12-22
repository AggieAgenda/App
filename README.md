# Aggie Agenda

Aggie Agenda is a productivity web platform that allows users to upload their class syllabi and automatically generates events in their Google Calendar. This tool is especially useful for students who want to better manage their academic deadlines and university events.

---

## Features

- Upload your syllabus to automatically add assignments and deadlines to Google Calendar.
- Web-based interface built with React and Vite for the frontend.
- Secure backend using Django and Django REST API.
- Handles file parsing and date extraction from syllabi.
- Integration with Google Calendar API (setup required).

---

## File Structure

├─ App/
│ ├─ Backend/ # Django backend
│ │ ├─ api/ # API endpoints for the backend
│ │ ├─ login/ # Authentication app
│ │ ├─ staticfiles/ # Static JS and CSS assets
│ │ ├─ manage.py # Django project management tool
│ │ ├─ requirements.txt # Python dependencies
│ │ └─ README.md # Backend Setup Instructions
│ ├─ Frontend/ # React application
│ │ ├─ public/ # Public images and static files
│ │ ├─ src/ # React components, hooks, pages
│ │ ├─ index.html
│ │ └─ README.md
│ ├─ LICENSE
│ ├─ package-lock.json
│ └─ README.md # 


---

## Getting Started

### Prerequisites

- **Python 3.10+** and **Django** for the backend
- **Node.js** (npm) for the frontend
- [Google Calendar API credentials](https://developers.google.com/calendar/quickstart/js) if syncing calendar events

### Backend Setup

1. Navigate to the backend directory and create a Python virtual environment:
   
    cd App/Backend
    python -m venv ../app_env
    ../app_env/Scripts/activate   # On Windows
    # or
    source ../app_env/bin/activate # On Mac/Linux
    2. Install dependencies:
   
    pip install -r requirements.txt
    3. Make sure to set up your environment variables in a `.env` file next to `manage.py`.
4. Start the backend server:
   
    python manage.py runserver
    ### Frontend Setup

1. Navigate to the frontend directory:
   
    cd App/Frontend
    2. Install dependencies:
   
    npm install
    3. Start the React development server:
   
    npm run dev
    ---

## Usage

- Once both frontend (`localhost:5173`) and backend (`localhost:8000`) are running, open your browser to the frontend URL.
- Upload your syllabus and follow on-screen instructions to sync with Google Calendar.

---

## Additional Information

- Code includes sample C++ data structures and algorithm assignments in `App/Backend/Calendar/CSCE 221` (for reference or academic use, not run by the main agenda app).
- Static files and styles are managed in `App/Backend/staticfiles/`.

---

## Contributing

Pull requests are welcome for improving syllabus parsing or the UI. Please open issues to discuss bugs or ideas first.

---

## License

This project is under the MIT License.
