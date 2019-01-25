
#From Google Developers for Google Calender API

from __future__ import print_function
from datetime import datetime
import pickle
import os.path
import sys
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/calendar']

def main():
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server()
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('calendar', 'v3', credentials=creds)

    #Add Event
    msg = 'Remainder - '+sys.argv[1]
    print(sys.argv[1])
    print(sys.argv[2])
    day = str(datetime.date(datetime.now())).split('-')
    time = (sys.argv[2]).split(':')
    print(time)
    hr = 0
    try:
        if "pm" in time[1]:
            hr = 12+int(time[0])-5
        elif "am" in time[1]:
            hr = int(time[0])
    except:
        try:
            if "pm" in time[0]:
                hr = 12+int(time[0][0:2])-5
            elif "am" in time[0]:
                hr = int(time[0][0:2])
        except:
            if "pm" in time[0]:
                hr = 12+int(time[0][0:1])-5
            elif "am" in time[0]:
                hr = int(time[0][0:1])


    GMT_OFF = '+05:30'
    EVENT = {
        'summary' : msg,
        'start' :  {'dateTime': '2019-01-%sT%s:00:00%s'% (str(int(day[2])+1), hr,GMT_OFF)},
        'end' : {'dateTime': '2019-01-%sT%s:00:00%s'% (str(int(day[2])+1), hr+5,GMT_OFF)},
        'reminders': {
                        'useDefault': False,
                        'overrides': [
                          {'method': 'popup', 'minutes': 10},
                        ],
                      }
    }
    #print(EVENT)
    event = service.events().insert(calendarId='primary', sendNotifications=True, body=EVENT).execute()
    print ('Event created: %s' % (event.get('htmlLink')))
    

if __name__ == '__main__':
    main()