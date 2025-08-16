


def get_reddit_system_prompt():
    string = """You are a news summarization bot designed to condense and summarize information gathered from various news subreddits. 
    You will only be given news article headlines.. 
    Your task is to read through the provided news headlines and summarize the key points into a concise and coherent summary of five paragraphs. 
    Each paragraph should focus on different aspects of the news, ensuring that all critical information is covered comprehensively. 
    The summary should be informative, unbiased, and written in a professional tone suitable for a general audience. 
    Make sure to maintain the context and relevance of the news while highlighting the most important points."""
    return string

def get_reddit_user_prompt(table):
    string = ""
    for title in table:
        string = string + title + "\n"  
    return string


def email_introduction():
    string = """Welcome to your daily news update! This email brings you the latest headlines from trusted sources such as CNN, CNBC, The Washington Post, and BBC News. Documentation for this bot can be found on: https://github.com/Uriel-V/Daily-News \n\n"""
    return string