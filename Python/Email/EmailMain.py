import smtplib
import datetime
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from GPT.Prompts import email_introduction

load_dotenv()

def send_email(recipient, body):
    if not recipient:
        print("No recipient, skipping send.")
        return

    try:
        current_time = datetime.datetime.now()
        subject_time = f"({current_time.month}/{current_time.day}/{current_time.year})"
        subject = f"Daily News Bot {subject_time}"

        sender = os.getenv("EMAIL_SENDER")
        body = email_introduction() + body
        text = f"Subject: {subject}\n\n{body}"

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender, os.getenv("EMAIL_KEY"))
            try:
                server.sendmail(sender, recipient, text)
                print(f"Email sent to {recipient}")
            except smtplib.SMTPRecipientsRefused:
                # Recipient rejected (mailbox doesn't exist or blocked)
                print(f"Recipient refused: {recipient} — skipping.")
            except Exception as e:
                # Other send errors — log and skip
                print(f"Failed to send to {recipient}: {e}")

    except Exception as e:
        print(f"SMTP setup failed for {recipient}: {e}")
    
def get_collection():
    client_url = os.getenv("MONGO_DB_CLIENT_CONNECTION")
    client = MongoClient(client_url)
    
    db = client["emailDatabase"]
    collection = db["emails"]
    return client, collection

def add_email_address(email):
    client, collection = get_collection()
    
    if collection.find_one({"email": email}):
        return
    
    mail = {"email": email}
    collection.insert_one(mail)
    client.close()

def remove_email_address(email):
    client, collection = get_collection()

    if collection.find_one({"email": email}):
        collection.delete_one({"email": email})
        client.close()
        return True
    
    client.close()
    return False

def get_all_emails():
    client, collection = get_collection()
    result = list(collection.find())
    client.close()
    return result