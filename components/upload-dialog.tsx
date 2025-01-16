'use client'

import { useState, useRef } from 'react'
import { Search, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from "@/hooks/use-toast"
import { AnimatePresence, motion } from 'framer-motion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface UploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSyllabusProcessed: (data: any) => void
}

interface UploadedFile {
  name: string;
  size: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  uploadedAt: Date;
}

export function UploadDialog({ open, onOpenChange, onSyllabusProcessed }: UploadDialogProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'files' | 'links'>('files')
  const [isUploading, setIsUploading] = useState(false)
  const [studyGuide, setStudyGuide] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    console.log('File selected:', { name: file.name, type: file.type, size: file.size })

    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    const newFile: UploadedFile = {
      name: file.name,
      size: file.size,
      status: 'uploading',
      uploadedAt: new Date()
    }
    setUploadedFiles([newFile])
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      
      console.log('Uploading file...')
      const response = await fetch('/api/generate-study-guide', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      console.log('File uploaded, processing response...')
      setUploadedFiles(files => 
        files.map(f => 
          f.name === file.name 
            ? { ...f, status: 'processing' as const }
            : f
        )
      )

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      let result = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const text = new TextDecoder().decode(value)
        console.log('Received chunk:', text.slice(0, 100)) // Log first 100 chars of each chunk
        result += text
        setStudyGuide(prev => prev ? prev + text : text)
      }

      console.log('Processing complete')
      setUploadedFiles(files => 
        files.map(f => 
          f.name === file.name 
            ? { ...f, status: 'complete' as const }
            : f
        )
      )

      onSyllabusProcessed(JSON.parse(result))
      toast({
        title: "Study guide generated",
        description: "Your study guide is ready!",
      })
    } catch (error) {
      setUploadedFiles(files => 
        files.map(f => 
          f.name === file.name 
            ? { ...f, status: 'error' as const }
            : f
        )
      )
      console.error('Upload error:', error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : 'Failed to process PDF',
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-6 bg-[#1A1A1A] border-gray-800/40">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M7 7h10v10M7 17L17 7" />
            </svg>
            <h2 className="text-lg font-medium text-gray-200">Sources</h2>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b border-gray-800/40">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('files')}
                className="relative pb-2 text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors"
              >
                <span className={activeTab === 'files' ? 'text-gray-200' : ''}>Files</span>
                {activeTab === 'files' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('links')}
                className="relative pb-2 text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors"
              >
                <span className={activeTab === 'links' ? 'text-gray-200' : ''}>Links</span>
                {activeTab === 'links' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 relative">
              {activeTab === 'files' ? (
                <>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search files"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-[#252525] border-transparent text-gray-200 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-gray-700 transition-all duration-200"
                  />
                </>
              ) : (
                <Input
                  placeholder="Add your domain (i.e. example.com)"
                  className="bg-[#252525] border-transparent text-gray-200 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-gray-700 transition-all duration-200"
                />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf"
            />
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    onClick={handleFileClick}
                    disabled={isUploading}
                    className="bg-[#21B8CD] hover:bg-[#1ea7ba] text-black font-normal transition-all duration-200 whitespace-nowrap"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      activeTab === 'files' ? '+ Add Files' : '+ Add Link'
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  align="center"
                  className="bg-[#202020] text-gray-200 text-xs border border-gray-800/40"
                >
                  Upload up to 5 documents, 25MB each
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="h-[320px] overflow-hidden relative">
            <AnimatePresence mode="wait">
              {activeTab === 'files' ? (
                <motion.div
                  key="files"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="h-full absolute w-full"
                >
                  <div className="grid grid-cols-12 text-sm text-gray-400 pb-2">
                    <div className="col-span-6">Name</div>
                    <div className="col-span-4">Uploaded</div>
                    <div className="col-span-2">Size</div>
                  </div>
                  
                  {uploadedFiles.length > 0 ? (
                    <div className="space-y-2 overflow-y-auto max-h-[calc(100%-2rem)]">
                      {uploadedFiles.map((file) => (
                        <div key={file.name} className="grid grid-cols-12 text-sm items-center py-2">
                          <div className="col-span-6 flex items-center gap-2 text-gray-200">
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                              <polyline points="13 2 13 9 20 9" />
                            </svg>
                            {file.name}
                          </div>
                          <div className="col-span-4 text-gray-400">
                            {file.status === 'uploading' && (
                              <span className="flex items-center gap-2">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Uploading...
                              </span>
                            )}
                            {file.status === 'processing' && (
                              <span className="flex items-center gap-2">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Processing...
                              </span>
                            )}
                            {file.status === 'complete' && (
                              <span className="text-green-500">Complete</span>
                            )}
                            {file.status === 'error' && (
                              <span className="text-red-500">Error</span>
                            )}
                          </div>
                          <div className="col-span-2 text-gray-400">
                            {formatFileSize(file.size)}
                          </div>
                        </div>
                      ))}

                      {studyGuide && (
                        <div className="mt-4 p-4 bg-gray-800/30 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-200 mb-2">Generated Study Guide:</h3>
                          <div className="text-sm text-gray-400 whitespace-pre-wrap">
                            {studyGuide}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-[calc(100%-2rem)] flex items-center justify-center text-gray-500 text-sm">
                      Add some files to your space below
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="links"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="h-full absolute w-full"
                >
                  <div className="flex justify-between text-sm text-gray-400 pb-2">
                    <div>Domain</div>
                    <div className="mr-8">Added by</div>
                  </div>

                  <div className="h-[calc(100%-2rem)] flex items-center justify-center text-gray-500 text-sm">
                    Add some links to your space below
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-800/40">
            <div className="text-sm text-gray-400">1 of 1</div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                disabled
                className="h-6 text-gray-600 hover:text-gray-500 px-2 transition-colors duration-200"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Prev
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled
                className="h-6 text-gray-600 hover:text-gray-500 px-2 transition-colors duration-200"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

