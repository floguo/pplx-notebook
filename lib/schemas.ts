import { z } from "zod"

export const pdfExtractSchema = z.object({
  title: z.string(),
  summary: z.string(),
  keyPoints: z.array(z.string()),
  context: z.string().optional(),
}) 