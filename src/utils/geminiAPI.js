/**
 * Google Gemini API Integration for EcoFarm
 * Handles all AI-powered responses for agricultural questions
 */

// Use environment variable for API key (set in .env file)
// For production, use a backend proxy to keep the key secure
const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "AIzaSyDWbDrYwAbAaA57bwnNprRnQ00xmZTdIxM";
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
        // Use serverless function endpoint
        // In development: calls local API (if available)
        // In production: calls Vercel serverless function
        const API_ENDPOINT = process.env.API_ENDPOINT || process.env.VITE_API_ENDPOINT || '/api/gemini';

        const fetchResponse = async () => {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: question.trim()
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                // Retry on transient errors
                if (response.status === 503 || response.status === 429) {
                    throw new Error(`Transient Error: ${response.status}`);
                }
                throw new Error(errorData.error || `API Error: ${response.statusText}`);
            }

            return await response.json();
        };

        const data = await retryWithBackoff(fetchResponse);

        // Extract the answer from the serverless function response
        if (data.success && data.answer) {
            return data.answer;
        }

        throw new Error('No response generated from AI');

    } catch (error) {
        console.error('Gemini API Error:', error);

        // Return a fallback response with error context
        if (error.message.includes('API_KEY') || error.message.includes('API key')) {
            return 'Error: API key not configured. Please contact administrator.';
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
        const API_ENDPOINT = process.env.API_ENDPOINT || process.env.VITE_API_ENDPOINT || '/api/gemini';

        const fetchResponse = async () => {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: question.trim(),
                    imageBase64: imageBase64
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                if (response.status === 503 || response.status === 429) {
                    throw new Error(`Transient Error: ${response.status}`);
                }
                throw new Error(errorData.error || `API Error: ${response.statusText}`);
            }

            return await response.json();
        };

        const data = await retryWithBackoff(fetchResponse);

        if (data.success && data.answer) {
            return data.answer;
        }

        throw new Error('No response generated from AI');

    } catch (error) {
        console.error('Gemini API Error (with image):', error);
        return `Unable to analyze image at this time. Error: ${error.message}`;
    }
}
