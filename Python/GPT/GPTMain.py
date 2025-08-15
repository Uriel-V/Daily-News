import os
from dotenv import load_dotenv
from openai import OpenAI
from GPT.Prompts import get_reddit_system_prompt, get_reddit_user_prompt

load_dotenv()


def GPT_start(data_table):
    print("Accessing OpenAI...")
    client = OpenAI(api_key = os.getenv("GPT_API_KEY"))
    return RedditPrompt(data_table, client)


def RedditPrompt(data_table, client):
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": get_reddit_system_prompt() },
        {"role": "user", "content": get_reddit_user_prompt(data_table) }
    ]
    )

    return completion.choices[0].message.content