'use client'

import { useState, useEffect } from 'react'

interface StudyPathItem {
  topic: string
  description: string
  estimatedHours: number
}

interface StudyPathProps {
  studyPath?: StudyPathItem[]
}

export function StudyPath({ studyPath }: StudyPathProps) {
  const [selectedTopic, setSelectedTopic] = useState<StudyPathItem | null>(null)

  useEffect(() => {
    if (studyPath && studyPath.length > 0) {
      setSelectedTopic(studyPath[0])
    }
  }, [studyPath])

  if (!studyPath || studyPath.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Study Path</h2>
        <p className="text-gray-400">Upload a syllabus to generate your study path.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Study Path</h2>
      <ul className="space-y-2">
        {studyPath.map((item, index) => (
          <li key={index}>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg ${
                selectedTopic === item ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setSelectedTopic(item)}
            >
              {item.topic}
            </button>
          </li>
        ))}
      </ul>
      {selectedTopic && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{selectedTopic.topic}</h3>
          <p className="text-gray-300 mt-2">{selectedTopic.description}</p>
          <p className="text-gray-400 mt-1">Estimated time: {selectedTopic.estimatedHours} hours</p>
        </div>
      )}
    </div>
  )
}

