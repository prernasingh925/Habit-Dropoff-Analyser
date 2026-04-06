import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key is not configured' });
  }

  try {
    const { habitName, stage1, stage2, stage3, appCategory, retention, context } = req.body;

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use the reliable flash model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // The system prompt logic for habit drop-off analysis
    const prompt = `
You are an expert Product Manager diagnostic AI. Your goal is to analyze a user habit loop and tell the PM where the bottleneck is and how to fix it.

INPUT DATA:
Habit Name: ${habitName}
App Category: ${appCategory}

JOURNEY STAGES & DROP-OFF:
Stage 1 (Trigger): ${stage1.name} -> Drop-off: ${stage1.dropoff}%
Stage 2 (Routine): ${stage2.name} -> Drop-off: ${stage2.dropoff}%
Stage 3 (Reward): ${stage3.name} -> Drop-off: ${stage3.dropoff}%

RETENTION METRICS (if available):
D1: ${retention?.d1 || 'N/A'}%
D7: ${retention?.d7 || 'N/A'}%
D30: ${retention?.d30 || 'N/A'}%

ADDITIONAL CONTEXT FROM PM: ${context || 'None provided'}

TASKS:
1. Identify which stage is the biggest bottleneck (highest drop-off).
2. Explain why it is breaking in 1-2 sentences. Use the context and drop-off numbers.
3. Determine the severity (Critical, High, Medium, Low). E.g. >40% drop-off = Critical, >25% = High.
4. Estimate confidence scores for Diagnosis (70-100), Fix Impact (60-95), and Experiment Quality (75-100).
5. Suggest exactly 3 structured experiments to fix the bottleneck. 

OUTPUT FORMAT: Return ONLY a valid JSON object matching this schema. No markdown wrapping.
{
  "diagnosis": {
    "bottleneckStageName": "Stage 1/2/3 Name",
    "explanation": "Why it's breaking",
    "severity": "Critical/High/Medium/Low"
  },
  "confidence": {
    "diagnosis": 85,
    "impact": 70,
    "quality": 90
  },
  "experiments": [
    {
      "title": "String",
      "hypothesis": "IF ... THEN ... BECAUSE ...",
      "implementation": "1-2 sentences on what to change",
      "primaryMetric": "Stage completion rate",
      "expectedImpact": "+X-Y%",
      "complexity": "Low/Medium/High"
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const parsed = JSON.parse(text);
    return res.status(200).json(parsed);

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Failed to generate diagnosis', details: error.message });
  }
}
