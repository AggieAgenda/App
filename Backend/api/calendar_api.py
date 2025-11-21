import datetime
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar"]


def main():
  """Shows basic usage of the Google Calendar API.
  Prints the start and name of the next 10 events on the user's calendar.

  THIS IS AN INITAL TEST / REFERENCE TEMPLATE 
  """
  creds = None
  # The file token.json stores the user's access and refresh tokens, and is
  # created automatically when the authorization flow completes for the first
  # time.
  if os.path.exists("token.json"):
    creds = Credentials.from_authorized_user_file("token.json", SCOPES)
  # If there are no (valid) credentials available, let the user log in.
  if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
      creds.refresh(Request())
    else:
      flow = InstalledAppFlow.from_client_secrets_file(
          "testing_credentials.json", SCOPES #CREDENTIALS NEEDS TO BE SECRET 
      )
      creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open("token.json", "w") as token:
      token.write(creds.to_json())

  try:
    service = build("calendar", "v3", credentials=creds)

    # Call the Calendar API
    now = datetime.datetime.now(tz=datetime.timezone.utc).isoformat()
    print("Getting the upcoming 10 events")
    events_result = (
        service.events()
        .list(
            calendarId="primary",
            timeMin=now,
            maxResults=10,
            singleEvents=True,
            orderBy="startTime",
        )
        .execute()
    )
    events = events_result.get("items", [])

    if not events:
      print("No upcoming events found.")
      return

    # Prints the start and name of the next 10 events
    for event in events:
      start = event["start"].get("dateTime", event["start"].get("date"))
      print(start, event["summary"])

  except HttpError as error:
    print(f"An error occurred: {error}")

def getCred():
  '''Get my creds from the mysterious google code
  learn later how to make this part work
  idk are we even saving the creds in json'''
  creds = None
  # The file token.json stores the user's access and refresh tokens, and is
  # created automatically when the authorization flow completes for the first
  # time.
  if os.path.exists("token.json"):
    creds = Credentials.from_authorized_user_file("token.json", SCOPES)
  # If there are no (valid) credentials available, let the user log in.
  if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
      creds.refresh(Request())
    else:
      flow = InstalledAppFlow.from_client_secrets_file(
          "testing_credentials.json", SCOPES #CREDENTIALS NEEDS TO BE SECRET 
      )
      creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open("token.json", "w") as token:
      token.write(creds.to_json())
  return creds

  
def testFunction(cred):
  '''
  This function is to test and learn how to use google api calls
  it prints info out to the console 
  '''
  #implement validating if credientials passed in correctly

  #Actual API call
  try:
    service = build("calendar", "v3", credentials=cred)

    # Call the Calendar API
    now = datetime.datetime.now(tz=datetime.timezone.utc).isoformat()
    print("Getting the upcoming 10 events")
    events_result = (
        service.events()
        .list(
            calendarId="primary",
            timeMin=now,
            maxResults=10,
            singleEvents=True,
            orderBy="startTime",
        )
        .execute()
    )
    events = events_result.get("items", [])

    if not events:
      print("No upcoming events found.")
      return

    # Prints the start and name of the next 10 events
    for event in events:
      start = event["start"].get("dateTime", event["start"].get("date"))
      print(start, event["summary"])

  except HttpError as error:
    print(f"An error occurred: {error}")

def create_calendar_event(creds, summary, start_time, end_time, description=None, location=None):
    """
    Creates a Google Calendar event.

    Parameters:
        creds (Credentials): Authorized Google credentials
        summary (str): Event title
        start_time (datetime): Start time (UTC or with tzinfo)
        end_time (datetime): End time (UTC or with tzinfo)
        description (str): Optional event description
        location (str): Optional location string
    """

    try:
        service = build("calendar", "v3", credentials=creds)

        event = {
            "summary": summary,
            "location": location,
            "description": description,
            "start": {
                "dateTime": start_time.isoformat(),
                "timeZone": "CST",  # change to your timezone if needed
            },
            "end": {
                "dateTime": end_time.isoformat(),
                "timeZone": "CST",
            },
        }

        created_event = service.events().insert(calendarId="primary", body=event).execute()

        print(f"Event created: {created_event.get('htmlLink')}")
        return created_event

    except HttpError as error:
        print(f"An error occurred: {error}")
        return None

#if __name__ == "__main__":
  #main()
#testFunction(getCred())
start = datetime.datetime(2025, 11, 21, 5, 0, tzinfo=datetime.timezone.utc) #default timezone is utc 
end = start + datetime.timedelta(hours=2)
create_calendar_event(getCred(), summary="Testing", start_time=start, end_time=end, description="This is a test", location="hell")