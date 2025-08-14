from openai import OpenAI
from GPT.Prompts import get_reddit_system_prompt
from GPT.Prompts import get_reddit_user_prompt
from GPT.Settings import API_key

client = OpenAI(api_key= API_key())


def GPT_start(data_table):
    print("Accessing OpenAI...")
    return RedditPrompt(data_table)


def RedditPrompt(data_table):
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": get_reddit_system_prompt() },
        {"role": "user", "content": get_reddit_user_prompt(data_table) }
    ]
    )

    return completion.choices[0].message.content