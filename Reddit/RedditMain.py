from Reddit.Settings import login_information
import praw





def on_start():
    print("Reddit API Startup")
    login_info = login_information()
    
    reddit = praw.Reddit(
        client_id = login_info['clientID'],
        client_secret = login_info['secret'],
        user_agent = login_info['user_agent'],
    )
    print(reddit.read_only)
    

    
