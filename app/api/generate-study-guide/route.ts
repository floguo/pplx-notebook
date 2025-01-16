import { NextRequest, NextResponse } from 'next/server'
import { google } from "@ai-sdk/google"
import { streamObject } from "ai"
import { pdfExtractSchema } from "@/lib/schemas"

export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    console.log('Received PDF upload request')
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      console.log('No file provided')
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size
    })

    const arrayBuffer = await file.arrayBuffer()
    const base64Data = Buffer.from(arrayBuffer).toString('base64')
    console.log('File converted to base64')

    const result = await streamObject({
      model: google("gemini-1.5-pro-latest"),
      messages: [
        {
          role: "system",
          content: "You are a document analyzer. Extract the most important points from the provided PDF document. Focus on key information, main ideas, and significant details.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please read this PDF and extract the key points. Include relevant context where helpful.",
            },
            {
              type: "file",
              data: base64Data,
              mimeType: "application/pdf",
            },
          ],
        },
      ],
      schema: pdfExtractSchema,
      output: "object",
      onFinish: ({ object }) => {
        console.log('Processing complete:', object)
        const res = pdfExtractSchema.safeParse(object)
        if (res.error) {
          throw new Error(res.error.errors.map((e) => e.message).join("\n"))
        }
      },
    })

    console.log('Streaming response started')
    return result.toTextStreamResponse()

  } catch (error) {
    console.error('PDF processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process PDF' },
      { status: 500 }
    )
  }
}

