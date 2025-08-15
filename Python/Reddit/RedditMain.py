import os
from dotenv import load_dotenv
import praw

load_dotenv()

#Get information needed to access reddit API from a hidden folder
reddit = praw.Reddit(
    client_id = os.getenv("REDDIT_CLIENT_ID"),
    client_secret = os.getenv("REDDIT_SECRET"),
    user_agent = os.getenv("REDDIT_USER_AGENT"),
)


#Get the titles of a selected subreddit and add them to a list
def get_titles(subreddit, search_limit, target, table):
    subreddit = reddit.subreddit(subreddit)
    retrieve_count = 0

    for submission in subreddit.hot(limit = search_limit):

        if retrieve_count >= target:
            break
        if submission.stickied == True:
            continue

        table.append(submission.title)
        retrieve_count += 1
    

def Reddit_start():
    title_data = []
    print("Accessing Reddit API...")
    get_titles("politics", 50, 5, title_data)
    get_titles("worldnews", 50, 5, title_data)
    
    return title_data

