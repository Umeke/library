from django.conf import settings
from openai import OpenAI

client = OpenAI(api_key=settings.OPENAI_API_KEY, )


def ask_chatgpt(question):
    try:
        # Use the new API to get a response
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"Generate 5 multiple-choice questions about the book '{book_title}'."}
            ],
            max_tokens=500  # Adjust max tokens based on the response length

        )
        return response.choices[0].message.content.strip()

    except Exception as e:
        print(f"Error generating questions: {e}")
    except Exception as e:
        return f"Error: {e}"
