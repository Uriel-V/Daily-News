import smtplib
Subject = 'Python Email Test'
Body = 'This is the body of the email. Testing testing..'
Recipient = 'blackwrlds@gmail.com'

# Import the email modules we'll need
# from email.mime.text import MIMEText

# Open a plain text file for reading.  For this example, assume that
# the text file contains only ASCII characters.
# with open(textfile, 'rb') as fp:
#     # Create a text/plain message
#     msg = MIMEText(fp.read())
msg = {}
# me == the sender's email address
# you == the recipient's email address
msg['Subject'] = 'The contents of %s' % textfile
msg['From'] = me
msg['To'] = Recipient

# Send the message via our own SMTP server, but don't include the
# envelope header.
s = smtplib.SMTP('localhost')
s.sendmail(me, [you], msg.as_string())
s.quit()