import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import pdf from 'pdf-parse';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const buffer = await file.arrayBuffer();
    const data = await pdf(Buffer.from(buffer));

    const summary = await generateText({
      model: openai('gpt-4o'),
      prompt: `Analyze the following syllabus and create a structured study plan:

${data.text}

Format the output as JSON with the following structure:
{
  "courseName": "Name of the course",
  "courseDescription": "Brief description of the course",
  "studyPlan": [
    {
      "week": 1,
      "topic": "Topic for week 1",
      "description": "Brief description of the week's content",
      "estimatedHours": 5
    },
    ...
  ]
}`,
    });

    return NextResponse.json(JSON.parse(summary.text));
  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json({ error: 'Error processing PDF' }, { status: 500 });
  }
}

