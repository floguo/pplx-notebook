'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react'
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
  const [activeTab, setActiveTab] = useState<'files' | 'links'>('files')
  const filesRef = useRef<HTMLButtonElement>(null)
  const linksRef = useRef<HTMLButtonElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, x: 0 })
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const activeRef = activeTab === 'files' ? filesRef : linksRef
    if (activeRef.current) {
      const { width, x } = activeRef.current.getBoundingClientRect()
      const parentX = activeRef.current.parentElement?.getBoundingClientRect().x || 0
      setIndicatorStyle({ width, x: x - parentX })
    }
  }, [activeTab])

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
                    {activeTab === 'files' && (
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    )}
                    <motion.div
                      initial={{ width: "100%" }}
                      animate={{ width: "100%" }}
                      exit={{ width: "100%" }}
                    >
                      <Input 
                        placeholder={activeTab === 'files' ? "Search files" : "Add your domain (i.e. example.com)"}
                        className={cn(
                          "text-neutral-200 w-full",
                          activeTab === 'files' ? "pl-9" : "pl-3"
                        )}
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    {activeTab === 'files' ? (
                      <div className="group relative">
                        <Button className="bg-[#21B8CD] hover:bg-[#1ea7ba] text-black whitespace-nowrap">
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

                <div className="flex text-sm text-neutral-400 pb-2">
                  {activeTab === 'files' ? (
                    <>
                      <div className="flex-[2]">Name</div>
                      <div className="flex-1 text-right pr-12">Uploaded</div>
                      <div className="w-28 text-right">Size</div>
                    </>
                  ) : (
                    <>
                      <div className="flex-[2]">Domain</div>
                      <div className="flex-[1.5] text-right pr-8">Added by</div>
                      <div className="w-8" />
                    </>
                  )}
                </div>

                <div className="h-[300px] flex items-center justify-center text-neutral-500 text-sm">
                  {activeTab === 'files' 
                    ? "Add some files to your space below"
                    : "Add some links to your space below"
                  }
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="px-6 py-3 flex items-center justify-between text-sm text-neutral-400 border-t border-neutral-800">
            <div>1 of 1</div>
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-0.5 px-1 py-0.5 hover:text-neutral-300 disabled:opacity-50">
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>
              <button className="flex items-center gap-0.5 px-1 py-0.5 hover:text-neutral-300 disabled:opacity-50">
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

