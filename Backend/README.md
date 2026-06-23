# Aggie Agenda Backend

The backend is a Django and Django REST Framework API.

## Prerequisites

- Python 3.10 or higher
- PostgreSQL database URL
- Google OAuth credentials
- Supabase project URL and anon key

## Setup

From the repository root:

```bash
cd Backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Fill in the required values in `.env`:

- `SECRET_KEY`
- `DATABASE_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Then run migrations and start the server:

```bash
python manage.py migrate
python manage.py runserver
```

The backend runs at `http://localhost:8000` by default.

## Validation

```bash
python manage.py check
```
