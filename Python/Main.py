import os

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from Reddit.RedditMain import Reddit_start
from Email.EmailMain import send_email, get_all_emails, add_email_address, remove_email_address
from GPT.GPTMain import GPT_start

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://daily-news-gsza15itp-sonicfav-3392s-projects.vercel.app/"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

def initialize_email_service(Recipiants, Body):
    print("Initializing Email...")
    seen = set()
    for email_data in Recipiants:
        email = email_data.get("email")
        if not email:
            continue  # skip if missing
        if email in seen:
            continue  # skip duplicates
        seen.add(email)

        send_email(email, Body)
        print("Email sent to " + email)



def send_news():
    print("Program Startup")

    subreddit_list = Reddit_start()
    print("Subreddits accessed") 

    message = GPT_start(subreddit_list)
    print("AI message written")

    print("Accessing email service...")
    email_list = get_all_emails()
    initialize_email_service(email_list, message)


class EmailPayload(BaseModel):
    text: str

class AdminKey(BaseModel):
    text: str

@app.post("/email/add")
def add_email(data: EmailPayload):
    print(data.text)
    try:
        add_email_address(data.text)  
        return {"result": "Email added", "email": data.text}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/email/remove")
def remove_email(data: EmailPayload):
    try:
        result = remove_email_address(data.text)
        if result == True:
            return {"result": "Email removed", "email": data.text}
        else:
            raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.post("/adminkey")
def check_admin_key(data: AdminKey):
    try:
        key = os.getenv("ADMIN_KEY")
        if data.text == key:
            send_news()
            return {"result": "Correct Key"}
        else:
            raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# if __name__ == '__main__':
    # send_news()
