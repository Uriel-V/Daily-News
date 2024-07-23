#THIS IS THE MAIN FILE. START THE CODE FROM HERE
#TODO: Need to get reddit API and gather data


from Reddit.RedditMain import Reddit_start
from GPT.GPTMain import GPT_start

def start():
    print("Program Startup")
    subreddit_list = Reddit_start()
    print("Subreddits accessed") 
    GPT_start(subreddit_list)


def email_test():
    print("testing email sender")


if __name__ == '__main__':
    # start()
    email_test()