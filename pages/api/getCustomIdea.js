// pages/api/getCustomIdea.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Check HTTP method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract category from request body
  const { category } = req.body;

  // Validate category
  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? "Set" : "Not set");
  console.log('Category received:', category);

  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set');
    return res.status(500).json({ error: 'Internal server error' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", 
          content: "You are an event planning expert who generates creative and unique event ideas. You must keep it stiliish and professional. Don't use more than 200 characters."
        },
        {
          role: "user", 
          content: `Generate a unique event idea for the category: ${category}. Include potential activities, target audience, and expected outcomes.`
        }
      ],
      max_tokens: 150,
      temperature: 0.7
    });

    const idea = response.choices[0].message.content.trim();
    res.status(200).json({ idea });
  } catch (error) {
    console.error("Error fetching idea from OpenAI:", error.message);
    res.status(500).json({ error: "Failed to fetch idea" });
  }
}
