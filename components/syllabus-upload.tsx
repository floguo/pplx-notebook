'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UploadDialog } from './upload-dialog'

interface SyllabusData {
  courseName: string
  courseDescription: string
  studyPlan: Array<{
    week: number
    topic: string
    description: string
    estimatedHours: number
  }>
}

export function SyllabusUpload() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [syllabusData, setSyllabusData] = useState<SyllabusData | null>(null)

  const handleSyllabusProcessed = (data: SyllabusData) => {
    setSyllabusData(data)
    // You can add additional logic here to update other components or state
  }

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-800/60">
      <div className="max-w-xl">
        <h2 className="text-xl font-semibold mb-2">Upload Your Syllabus</h2>
        <p className="text-gray-400 mb-4">
          Upload your course syllabus to get started with a personalized study plan.
        </p>
        {syllabusData ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">{syllabusData.courseName}</h3>
            <p className="text-gray-400 mb-4">{syllabusData.courseDescription}</p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-[#21B8CD] hover:bg-[#1ea7ba] text-white btn-shrink"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload New Syllabus
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-[#21B8CD] hover:bg-[#1ea7ba] text-white btn-shrink"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Syllabus
          </Button>
        )}
      </div>
      <UploadDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSyllabusProcessed={handleSyllabusProcessed}
      />
    </div>
  )
}

