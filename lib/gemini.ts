import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

export async function generateStudyGuide(content: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  
  const prompt = `Create a comprehensive study guide from this course outline. Include:
  - Key topics and concepts
  - Learning objectives
  - Important definitions
  - Study tips
  Format the response in markdown.
  
  Course outline:
  ${content}`

  const result = await model.generateContent(prompt)
  return result.response.text()
}

export async function extractImportantDates(content: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  
  const prompt = `Extract all important dates and deadlines from this course outline. Include:
  - Assignment due dates
  - Exam dates
  - Project deadlines
  - Any other significant dates
  Format as a chronological list in markdown with dates and descriptions.
  
  Course outline:
  ${content}`

  const result = await model.generateContent(prompt)
  return result.response.text()
} 