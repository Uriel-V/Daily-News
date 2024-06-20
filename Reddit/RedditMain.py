from Reddit.Settings import login_information
import praw

#use fun fact reddit??


appended_data = []
posts_to_retrieve = 3
current_retrieve_count = 0
maximum_subreddit_search = 100

def on_start():
    print("Accessing Reddit API...")
    login_info = login_information()
    
    reddit = praw.Reddit(
        client_id = login_info['clientID'],
        client_secret = login_info['secret'],
        user_agent = login_info['user_agent'],
    )
    # print(reddit.read_only)
    
    global posts_to_retrieve
    global current_retrieve_count
    global maximum_subreddit_search

    subreddit = reddit.subreddit("UMD")
    for submission in subreddit.hot(limit = maximum_subreddit_search):

        if current_retrieve_count >= posts_to_retrieve:
            break

        if submission.is_self:
            # print("This is a text post.")
            # appended_data.append(submission.selftext)
            current_retrieve_count = current_retrieve_count + 1

            print(submission)
            print(f"{submission.title}\n")
            print(f"Selftext: {submission.selftext}\n")
        
        # appended_data.append(submission.selftext)
        # print(appended_data)
        # print(f"{submission.selftext}\n")
        # print(f"{submission.title}\n")
        # print(reddit.submission('1djsy03').selftext)
        # test = submission.selftext
        # print(test)

        # print(f"Selftext: {submission.selftext}")
        # test = submission.selftext
        # print(f"Test variable: {test}")
    print(appended_data)