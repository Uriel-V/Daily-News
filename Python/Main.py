#THIS IS THE MAIN FILE. START THE CODE FROM HERE
from Reddit.RedditMain import Reddit_start
from Email.EmailMain import send_email
from GPT.GPTMain import GPT_start

def initialize_email_service(Recipiants, Body):
    print("Initializing Email...")
    for email_address in Recipiants:
        send_email(email_address, Body)
        print("Email sent to " + email_address)



def start():
    print("Program Startup")

    subreddit_list = Reddit_start()
    print("Subreddits accessed") 

    message = GPT_start(subreddit_list)
    print("AI message written")

    print("Accessing email service...")
    initialize_email_service(['6jellydonuts@gmail.com'], message)




if __name__ == '__main__':
    start()