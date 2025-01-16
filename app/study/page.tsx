'use client'

import { useState, Suspense } from 'react'
import { Book, GraduationCap, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StudyCard } from '@/components/study-card'
import { UploadDialog } from '@/components/upload-dialog'
import { StudySkeleton } from '@/components/study-skeleton'

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

export default function StudyPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [syllabusData, setSyllabusData] = useState<SyllabusData | null>(null)

  const handleSyllabusProcessed = (data: SyllabusData) => {
    setSyllabusData(data)
    // You can add additional logic here to update other components or state
  }

  return (
    <Suspense fallback={<StudySkeleton />}>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/40">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-neutral-400" />
            <h1 className="text-xl font-medium text-neutral-200">Study</h1>
          </div>
          <Button variant="outline" className="text-sm bg-transparent border-neutral-800 text-neutral-400 hover:text-neutral-300 hover:bg-neutral-800">
            Learn More
          </Button>
        </div>

        <div className="flex-1 px-6 py-8 max-w-3xl mx-auto w-full">
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-medium text-neutral-200 mb-4">My Study Plans</h2>
              <div className="grid gap-4">
                {syllabusData ? (
                  <StudyCard
                    title={syllabusData.courseName}
                    icon={<Book className="w-5 h-5" />}
                    isNew
                  />
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(true)}
                    className="w-full justify-start gap-2 p-6 text-base bg-[#1E1E1E] border-neutral-800 hover:bg-[#252525] hover:border-neutral-700 text-neutral-400"
                  >
                    <Plus className="w-5 h-5" />
                    Create a Study Plan
                  </Button>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-medium text-neutral-200 mb-4">Examples</h2>
              <div className="flex flex-col gap-3">
                <StudyCard
                  title="Computer Science Fundamentals"
                  icon={<Book className="w-5 h-5" />}
                  isNew
                />
                <StudyCard
                  title="Machine Learning Basics"
                  icon={<Book className="w-5 h-5" />}
                  isPrivate
                />
                <StudyCard
                  title="Web Development Bootcamp"
                  icon={<Book className="w-5 h-5" />}
                  isNew
                />
              </div>
            </section>
          </div>
        </div>

        <UploadDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSyllabusProcessed={handleSyllabusProcessed}
        />
      </div>
    </Suspense>
  )
}

