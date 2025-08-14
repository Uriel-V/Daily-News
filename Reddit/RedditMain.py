from Reddit.Settings import login_information
import praw

#Get information needed to access reddit API from a hidden folder
login_info = login_information()
reddit = praw.Reddit(
    client_id = login_info['clientID'],
    client_secret = login_info['secret'],
    user_agent = login_info['user_agent'],
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

