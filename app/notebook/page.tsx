'use client'

import { useState, Suspense } from 'react'
import { Book, Pencil, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotebookCard } from '@/components/notebook-card'
import { UploadDialog } from '@/components/upload-dialog'
import { NotebookSkeleton } from '@/components/notebook-skeleton'

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

export default function NotebookPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [syllabusData, setSyllabusData] = useState<SyllabusData | null>(null)
  const [plans, setPlans] = useState<Array<{ id: string; title: string }>>([])
  const [showUploadPrompt, setShowUploadPrompt] = useState(false)

  const handleSyllabusProcessed = (data: SyllabusData) => {
    setSyllabusData(data)
  }

  const handleCreatePlan = () => {
    const newPlan = {
      id: Math.random().toString(36).substr(2, 9),
      title: "Untitled Plan"
    }
    setPlans(prev => [...prev, newPlan])
    setShowUploadPrompt(true)
    setIsDialogOpen(true)
  }

  const handleTitleChange = (id: string, newTitle: string) => {
    setPlans(prev => prev.map(plan => 
      plan.id === id ? { ...plan, title: newTitle } : plan
    ))
  }

  return (
    <Suspense fallback={<NotebookSkeleton />}>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/40">
          <div className="flex items-center gap-3">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="text-neutral-400"
            >
              <path d="M8 7h8" />
              <path d="M8 11h8" />
              <path d="M8 15h5" />
              <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 01-2.5-2.5z" />
            </svg>
            <h1 className="text-xl font-medium text-neutral-200">Notebook</h1>
          </div>
          <Button variant="outline" className="text-sm bg-transparent border-neutral-800 text-neutral-400 hover:text-neutral-300 hover:bg-neutral-800">
            Learn More
          </Button>
        </div>

        <div className="flex-1 px-6 py-8 max-w-3xl mx-auto w-full">
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-medium text-neutral-200 mb-4">My Notebooks</h2>
              <div className="space-y-3">
                {plans.map(plan => (
                  <NotebookCard
                    key={plan.id}
                    title={plan.title}
                    icon={<Book className="w-5 h-5" />}
                    isNew
                    isUntitled={plan.title === "Untitled Plan"}
                    onTitleChange={(newTitle) => handleTitleChange(plan.id, newTitle)}
                  />
                ))}
                {plans.length === 0 && (
                  <Button
                    variant="outline"
                    onClick={handleCreatePlan}
                    className="w-full justify-start gap-2 p-6 text-base bg-[#1E1E1E] border-neutral-800 hover:bg-[#252525] hover:border-neutral-700 text-neutral-400"
                  >
                    <Plus className="w-5 h-5" />
                    Create a Notebook
                  </Button>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-medium text-neutral-200 mb-4">Examples</h2>
              <div className="flex flex-col gap-3">
                <NotebookCard
                  title="Computer Science Fundamentals"
                  icon={<Book className="w-5 h-5" />}
                  isNew
                />
                <NotebookCard
                  title="Machine Learning Basics"
                  icon={<Book className="w-5 h-5" />}
                  isPrivate
                />
                <NotebookCard
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
          showUploadPrompt={showUploadPrompt}
        />
      </div>
    </Suspense>
  )
} 