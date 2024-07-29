import smtplib
import datetime
from GPT.Settings import email_key
from GPT.Settings import email_sender

def send_email(Recipient, body):
    current_time = datetime.datetime.now()
    subject_time = '(' + str(current_time.month) +'/'+ str(current_time.day) +'/'+ str(current_time.year) + ')'
 

    subject = 'Daily News Bot ' + subject_time
    # body = 'This is the body of the email. Testing testing..'
    sender = email_sender()

    text = 'Subject: ' + subject + "\n\n" + body

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender, email_key())
    server.sendmail(sender, Recipient, text)
    
    # print(subject)