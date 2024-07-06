from openai import OpenAI
from Prompts import get_reddit_system_prompt
from Prompts import get_reddit_user_prompt

client = OpenAI()


def GPT_start():
    print("Accessing OpenAI...")
    RedditPrompt()


def RedditPrompt():
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        # {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
        # {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
        {"role": "system", "content": get_reddit_system_prompt() },
        {"role": "user", "content": get_reddit_user_prompt() }
    ]
    )

    print(completion.choices[0].message)
    return completion.choices[0].message