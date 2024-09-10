import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

def parse_questions_from_response(response_text):
    import json
    res = json.loads(response_text)
    return res
# Initialize OpenAI client using the API key from the environment
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")  # Load API key from environment
)
title = 'Махаббат қызық мол жылдар'
language = 'kazakh'
# Make a request to OpenAI's Chat API
prompt = f"Generate 5 multiple-choice questions about the book '{title}' in '{language}' language give response only in json arrays (question, options, correct) for easy parse in python"
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": prompt}]
)
# Print the response
pp = response.choices[0].message.content
print(pp)

res = parse_questions_from_response(pp)

print(res)
