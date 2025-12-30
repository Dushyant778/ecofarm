/**
 * Vercel Serverless Function - Gemini API Proxy
 * This keeps your API key secure on the server
 */

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { question, imageBase64 } = req.body;

        if (!question || question.trim().length === 0) {
            return res.status(400).json({ error: 'Question is required' });
        }

        // Get API key from environment variable (set in Vercel dashboard)
        const API_KEY = process.env.GEMINI_API_KEY;

        if (!API_KEY) {
            console.error('GEMINI_API_KEY not set in environment variables');
            return res.status(500).json({
                error: 'API key not configured. Please set GEMINI_API_KEY in Vercel environment variables.'
            });
        }

        const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

        // Build request body
        const requestBody = {
            contents: [{
                parts: imageBase64
                    ? [
                        {
                            text: `You are an expert agricultural advisor. Analyze this crop/farm image and answer: ${question}`
                        },
                        {
                            inline_data: {
                                mime_type: "image/jpeg",
                                data: imageBase64
                            }
                        }
                    ]
                    : [
                        {
                            text: `You are an expert agricultural advisor helping farmers. Answer the following question concisely and practically. Focus on actionable advice suitable for farmers. Question: ${question}`
                        }
                    ]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        };

        // Call Gemini API
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API Error:', errorData);

            return res.status(response.status).json({
                error: errorData.error?.message || 'Failed to get AI response',
                status: response.status
            });
        }

        const data = await response.json();

        // Extract the text response
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiResponse) {
            return res.status(500).json({ error: 'No response generated from AI' });
        }

        // Return successful response
        return res.status(200).json({
            success: true,
            answer: aiResponse.trim(),
            metadata: {
                model: 'gemini-pro',
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}
