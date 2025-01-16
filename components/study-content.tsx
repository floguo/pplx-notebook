interface StudyContentProps {
  summary?: string
}

export function StudyContent({ summary }: StudyContentProps) {
  if (!summary) {
    return (
      <div className="bg-neutral-800 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Study Content</h2>
        <p className="text-neutral-400">Upload a syllabus to view the summary and study content.</p>
      </div>
    )
  }

  return (
    <div className="bg-neutral-800 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Syllabus Summary</h2>
      <p className="text-neutral-300">{summary}</p>
    </div>
  )
}

