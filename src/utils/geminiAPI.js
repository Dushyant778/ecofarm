/**
 * Google Gemini API Integration for EcoFarm
 * Handles all AI-powered responses for agricultural questions
 */

const API_KEY = "AIzaSyDWbDrYwAbAaA57bwnNprRnQ00xmZTdIxM";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} retries - Number of retries (default 3)
 * @param {number} delay - Initial delay in ms (default 1000)
 * @returns {Promise<any>}
 */
async function retryWithBackoff(fn, retries = 3, delay = 1000) {
    try {
        return await fn();
    } catch (error) {
        // Don't retry for authentication errors or if retries exhausted
        if (retries === 0 || error.message.includes('API_KEY') || error.message.includes('400')) {
            throw error;
        }

        console.log(`API call failed. Retrying in ${delay}ms... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, delay));

        return retryWithBackoff(fn, retries - 1, delay * 2);
    }
}

/**
 * Get AI response for agricultural questions using Google Gemini API
 * @param {string} question - The farming/agricultural question
 * @returns {Promise<string>} - AI-generated answer
 */
export async function getAIResponse(question) {
    try {
        const fetchResponse = async () => {
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are an expert agricultural advisor helping farmers. Answer the following question concisely and practically. Focus on actionable advice suitable for farmers. Question: ${question}`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                // 503 is Service Unavailable (overloaded), 429 is Too Many Requests
                if (response.status === 503 || response.status === 429) {
                    throw new Error(`Transient Error: ${response.status}`);
                }
                throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
            }

            return await response.json();
        };

        const data = await retryWithBackoff(fetchResponse);

        // Extract the text from Gemini's response structure
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiResponse) {
            throw new Error('No response generated from AI');
        }

        return aiResponse.trim();

    } catch (error) {
        console.error('Gemini API Error:', error);

        // Return a fallback response with error context
        if (error.message.includes('API_KEY')) {
            return 'Error: Invalid API key. Please check your configuration.';
        } else if (error.message.includes('quota')) {
            return 'The AI service has reached its quota. Please try again later.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
            return 'Network error. Please check your internet connection and try again.';
        }

        return `Unable to get AI response at this time. Error: ${error.message}. Please try asking your question again later.`;
    }
}

/**
 * Get AI response with image analysis (for future enhancement)
 * @param {string} question - The question about the image
 * @param {string} imageBase64 - Base64 encoded image
 * @returns {Promise<string>} - AI-generated answer
 */
export async function getAIResponseWithImage(question, imageBase64) {
    try {
        const fetchResponse = async () => {
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
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
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 503 || response.status === 429) {
                    throw new Error(`Transient Error: ${response.status}`);
                }
                throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
            }

            return await response.json();
        };

        const data = await retryWithBackoff(fetchResponse);
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiResponse) {
            throw new Error('No response generated from AI');
        }

        return aiResponse.trim();

    } catch (error) {
        console.error('Gemini API Error (with image):', error);
        return `Unable to analyze image at this time. Error: ${error.message}`;
    }
}
