from openai import OpenAI
from GPT.Prompts import get_reddit_system_prompt
from GPT.Prompts import get_reddit_user_prompt
from GPT.Settings import API_key

client = OpenAI(api_key= API_key())


def GPT_start(data_table):
    print("Accessing OpenAI...")
    RedditPrompt(data_table)


def RedditPrompt(data_table):
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        # {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
        # {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
        {"role": "system", "content": {get_reddit_system_prompt()} },
        {"role": "user", "content": {get_reddit_user_prompt(data_table)} }
    ]
    )

    print(completion.choices[0].message)
    return completion.choices[0].message