import { z } from "zod"

export const pdfExtractSchema = z.object({
  title: z.string()
    .min(1, "Title cannot be empty")
    .max(500, "Title is too long")
    .describe("The document title"),
  
  keyPoints: z.array(
    z.object({
      point: z.string()
        .min(1, "Point cannot be empty")
        .max(1000, "Point is too long")
        .describe("A key point from the document"),
      
      context: z.string()
        .min(1, "Context cannot be empty")
        .max(500, "Context is too long")
        .optional()
        .describe("Optional context or section where this point appears")
    })
  )
  .min(1, "At least one key point is required")
  .max(50, "Too many key points")
  .describe("List of important points extracted from the document")
})

export type PDFExtract = z.infer<typeof pdfExtractSchema> 