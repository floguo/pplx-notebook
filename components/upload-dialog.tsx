'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Search, ChevronLeft, ChevronRight, X, Loader2, MoreHorizontal } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
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
import { cn } from "@/lib/utils"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useDropzone } from 'react-dropzone'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSyllabusProcessed: (data: any) => void
  showUploadPrompt?: boolean
}

interface UploadedFile {
  name: string
  size: number
  status: 'uploading' | 'processing' | 'complete' | 'error'
  progress?: number
  uploadedAt: Date
}

export function UploadDialog({ 
  open, 
  onOpenChange, 
  onSyllabusProcessed,
  showUploadPrompt 
}: UploadDialogProps) {
  const [activeTab, setActiveTab] = useState<'files' | 'links'>('files')
  const filesRef = useRef<HTMLButtonElement>(null)
  const linksRef = useRef<HTMLButtonElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 32, x: 0 })
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()
  const inputRef = useRef<HTMLInputElement>(null)

  // Combined effect for both initial position and tab changes
  useEffect(() => {
    const updateIndicator = () => {
      const activeRef = activeTab === 'files' ? filesRef : linksRef
      if (activeRef.current) {
        const { width, x } = activeRef.current.getBoundingClientRect()
        const parentX = activeRef.current.parentElement?.getBoundingClientRect().x || 0
        setIndicatorStyle({ width, x: x - parentX })
      }
    }

    // Run immediately
    updateIndicator()
    
    // Also run after a short delay to ensure DOM is ready
    const timer = setTimeout(updateIndicator, 50)
    
    return () => clearTimeout(timer)
  }, [activeTab, open])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Create new file entries
    const newFiles = acceptedFiles.map(file => ({
      name: file.name,
      size: file.size,
      status: 'uploading' as const,
      progress: 0,
      uploadedAt: new Date()
    }))
    
    // Get the current length of files to offset the index
    const currentLength = uploadedFiles.length
    
    // Append new files to existing ones
    setUploadedFiles(prev => [...prev, ...newFiles])
    
    // Process each file
    acceptedFiles.forEach(async (file, index) => {
      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadedFiles(files => 
            files.map((f, i) => 
              i === (currentLength + index) && f.status === 'uploading'
                ? { ...f, progress: Math.min((f.progress || 0) + 10, 95) }
                : f
            )
          )
        }, 200)

        // TODO: Replace with your actual upload logic
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        clearInterval(progressInterval)
        
        setUploadedFiles(files =>
          files.map((f, i) =>
            i === (currentLength + index) ? { ...f, status: 'complete', progress: 100 } : f
          )
        )
        
        toast({
          title: "File uploaded successfully",
          description: file.name
        })
      } catch (error) {
        setUploadedFiles(files =>
          files.map((f, i) =>
            i === (currentLength + index) ? { ...f, status: 'error' } : f
          )
        )
        
        toast({
          title: "Upload failed",
          description: "Please try again",
          variant: "destructive"
        })
      }
    })
  }, [toast, uploadedFiles.length])

  const { getRootProps, getInputProps, isDragActive, open: openFileDialog } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 25 * 1024 * 1024, // 25MB
    noClick: false, 
    noKeyboard: false 
  })

  const renderFileList = () => {
    if (uploadedFiles.length === 0) {
      return (
        <div 
          {...getRootProps()}
          className={cn(
            "h-[300px] flex items-center justify-center text-neutral-500 text-sm border-2 border-dashed border-neutral-700/50 rounded-lg transition-colors cursor-default",
            isDragActive && "border-[#21B8CD]/50 bg-[#21B8CD]/5"
          )}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            "Drop your files here"
          ) : (
            "Drag & drop files here, or click to select files"
          )}
        </div>
      )
    }

    return (
      <div className="space-y-1">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="flex items-center text-sm py-2">
            <div className="flex-[2] truncate pr-4 text-neutral-400/60 font-light">{file.name}</div>
            <div className="w-36 text-left text-neutral-400/60">
              {file.status === 'uploading' && (
                <div className="flex items-center gap-2 text-[#21B8CD]">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{file.progress}%</span>
                </div>
              )}
              {file.status === 'complete' && new Date().toLocaleString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}
              {file.status === 'error' && (
                <span className="text-red-400">Failed</span>
              )}
            </div>
            <div className="w-24 text-left text-neutral-400/60">
              {(file.size / 1024).toFixed(0)} KB
            </div>
            <div className="w-10 flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 hover:text-neutral-200">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[140px]">
                  <DropdownMenuItem 
                    className="text-neutral-400"
                    onClick={() => {
                      // Add download logic here
                      toast({
                        title: "Downloading file",
                        description: file.name
                      })
                    }}
                  >
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-400 focus:text-red-400 focus:bg-red-400/10"
                    onClick={() => {
                      setUploadedFiles(files => files.filter((_, i) => i !== index))
                      toast({
                        title: "File removed",
                        description: file.name
                      })
                    }}
                  >
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    )
  }

  useEffect(() => {
    if (showUploadPrompt && open) {
      openFileDialog()
    }
  }, [showUploadPrompt, open, openFileDialog])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <div className="flex-1">
          <div className="p-4">
            <div className="relative mb-6">
              <div className="flex items-center gap-6">
                <button
                  ref={filesRef}
                  className={`text-sm font-medium py-2 ${activeTab === 'files' ? 'text-neutral-200' : 'text-neutral-500'}`}
                  onClick={() => setActiveTab('files')}
                >
                  Files
                </button>
                <button
                  ref={linksRef}
                  className={`text-sm font-medium py-2 ${activeTab === 'links' ? 'text-neutral-200' : 'text-neutral-500'}`}
                  onClick={() => setActiveTab('links')}
                >
                  Links
                </button>
              </div>
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-neutral-200"
                animate={{ 
                  x: indicatorStyle.x,
                  width: indicatorStyle.width
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 700,
                  damping: 35,
                  duration: 0.12
                }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative flex-1">
                    {activeTab === 'files' ? (
                      <>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <Input 
                          placeholder="Search files"
                          className={cn(
                            "text-neutral-200 w-full pl-9",
                            "bg-neutral-800/50"
                          )}
                        />
                      </>
                    ) : (
                      <Input 
                        placeholder="Add your domain (i.e. example.com)"
                        className={cn(
                          "text-neutral-200 w-full pl-3",
                          "bg-neutral-800/50"
                        )}
                      />
                    )}
                  </div>
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    {activeTab === 'files' ? (
                      <div className="group relative">
                        <Button 
                          onClick={openFileDialog} 
                          className="bg-[#21B8CD] hover:bg-[#1ea7ba] text-black whitespace-nowrap"
                        >
                          + Add Files
                        </Button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#2A2A2A] rounded-lg py-1.5 px-3 text-sm text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Upload up to 50 documents, 25MB each
                        </div>
                      </div>
                    ) : (
                      <Button className="bg-[#21B8CD] hover:bg-[#1ea7ba] text-black whitespace-nowrap">
                        + Add Link
                      </Button>
                    )}
                  </motion.div>
                </div>

                <div className="flex text-sm text-neutral-400/90 pb-2 border-b border-neutral-800/60">
                  {activeTab === 'files' ? (
                    <>
                      <div className="flex-[2] font-normal text-left">Name</div>
                      <div className="w-36 text-left font-normal">Uploaded</div>
                      <div className="w-24 text-left font-normal">Size</div>
                      <div className="w-10" />
                    </>
                  ) : (
                    <>
                      <div className="flex-[2]">Domain</div>
                      <div className="flex-[1.5] text-right pr-8">Added by</div>
                      <div className="w-8" />
                    </>
                  )}
                </div>

                <div className="h-[300px] overflow-y-auto">
                  {activeTab === 'files' ? renderFileList() : (
                    <div className="h-[300px] flex items-center justify-center text-neutral-500 text-sm">
                      Add some links to your space below
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pl-6 pr-3 pb-4 flex items-center justify-between text-sm text-neutral-400 border-neutral-800">
            <div>1 of 1</div>
            <div className="flex items-center gap-1">
              <button 
                disabled={true}
                className={cn(
                  "flex items-center gap-0.5 px-1 py-0.5",
                  "hover:text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-neutral-400"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>
              <button 
                disabled={true}
                className={cn(
                  "flex items-center gap-0.5 px-1 py-0.5",
                  "hover:text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-neutral-400"
                )}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogPrimitive.Close className="ml-auto rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none">
        <X className="h-5 w-5 text-neutral-400" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </Dialog>
  )
}

