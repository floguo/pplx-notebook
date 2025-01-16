'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, Plus, ChevronRight, ChevronDown, MoreVertical, Download, Trash2, Calendar, Pen } from 'lucide-react'
import { NoteEditor } from '@/components/note-editor'
import { UploadDialog } from '@/components/upload-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from 'framer-motion'
import { generateStudyGuide, extractImportantDates } from '@/lib/gemini'
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface FileItem {
  id: string
  name: string
  content: string
  size: number
  uploadedAt: Date
}

export default function NotebookDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const [title, setTitle] = useState("New page")
  const [content, setContent] = useState("")
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isFilesOpen, setIsFilesOpen] = useState(true)
  const [isLinksOpen, setIsLinksOpen] = useState(true)
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(true)
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'INF353H W25 Course Outline v1.0 - This is a very long file name that should truncate',
      content: '',
      size: 0,
      uploadedAt: new Date()
    }
  ])
  const [activeTab, setActiveTab] = useState<'files' | 'links'>('files')
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)

  const handleRemoveFile = (fileId: string) => {
    setFiles(files.filter(file => file.id !== fileId))
  }

  const handleOpenUpload = (tab: 'files' | 'links') => {
    setActiveTab(tab)
    setIsUploadOpen(true)
  }

  const handleFileProcessed = (file: FileItem) => {
    setFiles(prev => [...prev, file])
  }

  const handleGenerateStudyGuide = async () => {
    if (isGenerating || files.length === 0) {
      toast({
        title: "No files to process",
        description: "Please add files to your sources first",
        variant: "destructive"
      })
      return
    }
    
    try {
      setIsGenerating(true)
      const fileContents = files.map(file => file.content).join('\n\n')
      
      const studyGuide = await generateStudyGuide(fileContents)
      setContent(studyGuide)
      
      toast({
        title: "Study guide generated",
        description: "Your study guide is ready"
      })
    } catch (error) {
      toast({
        title: "Error generating study guide",
        description: "Please try again later",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExtractDates = async () => {
    if (isExtracting) return
    
    try {
      setIsExtracting(true)
      const fileContents = files.map(file => file.content).join('\n\n')
      
      const dates = await extractImportantDates(fileContents)
      setContent(prev => `${prev}\n\n## Important Dates\n${dates}`)
      
      toast({
        title: "Dates extracted",
        description: "Important dates have been added to your notes"
      })
    } catch (error) {
      toast({
        title: "Error extracting dates",
        description: "Please try again later",
        variant: "destructive"
      })
    } finally {
      setIsExtracting(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-[#191919]">
      <div className="fixed top-8 left-6">
        <button
          onClick={() => router.push('/notebook')}
          className="hover:bg-neutral-800/50 rounded-sm p-1.5 text-neutral-400 hover:text-neutral-300"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 px-8">
          <div className="max-w-2xl mx-auto flex flex-col min-h-0">
            <div className="pt-24 pb-8">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-4xl bg-transparent text-neutral-300 outline-none placeholder:text-neutral-500"
                placeholder="Untitled"
              />
            </div>

            <div className="pb-8 flex items-center gap-3">
              <button
                onClick={handleGenerateStudyGuide}
                disabled={isGenerating}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-300 transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-800/50 disabled:hover:text-neutral-400"
                )}
              >
                <Pen className="w-4 h-4" />
                <span className="text-sm">{isGenerating ? "Generating..." : "Generate Study Guide"}</span>
              </button>

              <button
                onClick={handleExtractDates}
                disabled={isExtracting}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-300 transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-800/50 disabled:hover:text-neutral-400"
                )}
              >
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{isExtracting ? "Extracting..." : "Extract Important Dates"}</span>
              </button>
            </div>

            <div className="flex-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type '/' for commands"
                className="w-full h-[calc(100vh-300px)] bg-transparent text-neutral-200 text-base resize-none outline-none placeholder:text-neutral-500 leading-relaxed"
                autoFocus
              />
            </div>
          </div>
        </div>

        <div className="w-80 border-l border-neutral-800">
          <div className="p-6 space-y-8">
            <div className="space-y-3">
              <button 
                onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
                className="w-full flex items-center justify-between group py-1.5"
              >
                <div className="flex items-center gap-2">
                  <motion.div 
                    animate={{ transform: `rotate(${isInstructionsOpen ? 0 : -90}deg)` }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                    style={{ transformOrigin: "center", willChange: "transform" }}
                  >
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-400" />
                  </motion.div>
                  <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider group-hover:text-neutral-300">
                    Instructions
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    // Add instruction handler here
                  }}
                  className="h-5 px-2 rounded-full bg-neutral-800/50 hover:bg-neutral-800 flex items-center gap-1.5 group/button"
                >
                  <Plus className="w-3 h-3 text-neutral-500 group-hover/button:text-neutral-300" />
                  <span className="text-xs text-neutral-500 group-hover/button:text-neutral-300">Add instruction</span>
                </button>
              </button>
              {isInstructionsOpen && (
                <div className="pl-6">
                  <div className="text-sm text-neutral-500 transition-all duration-200 transform opacity-0 -translate-y-2 animate-in">
                    No instructions added
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Sources</div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setIsFilesOpen(!isFilesOpen)}
                  className="w-full flex items-center justify-between group py-1.5"
                >
                  <div className="flex items-center gap-2">
                    <motion.div 
                      animate={{ transform: `rotate(${isFilesOpen ? 0 : -90}deg)` }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                      style={{ transformOrigin: "center", willChange: "transform" }}
                    >
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-400" />
                    </motion.div>
                    <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider group-hover:text-neutral-300">
                      Files
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenUpload('files')
                    }}
                    className="h-5 px-1 rounded-full bg-neutral-800/50 hover:bg-neutral-800 flex items-center gap-1 group/button"
                  >
                    <Plus className="w-3 h-3 text-neutral-500 group-hover/button:text-neutral-300" />
                    <span className="text-xs text-neutral-500 group-hover/button:text-neutral-300">Add file</span>
                  </button>
                </button>
                {isFilesOpen && (
                  <div className="pl-6">
                    {files.length === 0 ? (
                      <div className="text-sm text-neutral-500 transition-all duration-200 transform opacity-0 -translate-y-2 animate-in">
                        No files added
                      </div>
                    ) : (
                      <div className="space-y-1 transition-opacity duration-200 opacity-0 animate-in">
                        {files.map(file => (
                          <motion.div
                            key={file.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ 
                              opacity: { duration: 0.2 },
                              height: { duration: 0.2 },
                            }}
                            className="overflow-hidden"
                          >
                            <motion.div 
                              className="flex items-center w-full p-2 rounded-sm hover:bg-white/5 group"
                              layout
                            >
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <div className="text-sm text-neutral-300 group-hover:text-neutral-200 truncate">
                                  {file.name}
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="p-1 rounded-sm hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreVertical className="w-4 h-4 text-neutral-500 hover:text-neutral-400" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 bg-[#1E1E1E] border-neutral-800">
                                  <DropdownMenuItem className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-300 focus:text-neutral-300 focus:bg-white/5">
                                    <Download className="w-4 h-4" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleRemoveFile(file.id)}
                                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 focus:text-red-400 focus:bg-white/5"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Remove
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setIsLinksOpen(!isLinksOpen)}
                  className="w-full flex items-center justify-between group py-1.5"
                >
                  <div className="flex items-center gap-2">
                    <motion.div 
                      animate={{ transform: `rotate(${isLinksOpen ? 0 : -90}deg)` }}
                      transition={{ 
                        duration: 0.15,
                        ease: "easeInOut"
                      }}
                      style={{ 
                        transformOrigin: "center",
                        willChange: "transform"
                      }}
                    >
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-400" />
                    </motion.div>
                    <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider group-hover:text-neutral-300">
                      Links
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOpenUpload('links')
                    }}
                    className="h-5 px-2 rounded-full bg-neutral-800/50 hover:bg-neutral-800 flex items-center gap-1.5 group/button"
                  >
                    <Plus className="w-3 h-3 text-neutral-500 group-hover/button:text-neutral-300" />
                    <span className="text-xs text-neutral-500 group-hover/button:text-neutral-300">Add link</span>
                  </button>
                </button>
                {isLinksOpen && (
                  <div className="pl-6">
                    <div className="text-sm text-neutral-500 transition-all duration-200 transform opacity-0 -translate-y-2 animate-in">
                      No links added
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <UploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onFileProcessed={handleFileProcessed}
        onSyllabusProcessed={(data) => {
          setIsUploadOpen(false)
        }}
        defaultTab={activeTab}
      />
    </div>
  )
} 