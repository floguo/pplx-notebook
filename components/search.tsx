'use client'

import React, { useState } from 'react'
import { Focus, Paperclip, ArrowRight } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function Search() {
  const [isProActive, setIsProActive] = useState(false)
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-light tracking-[-0.02em] mb-8 text-center text-[#E5E5E5]">
        What do you want to know?
      </h1>
      
      <div className="rounded-lg border border-neutral-700/30 bg-[#202222]/90">
        <textarea
          placeholder="Ask anything..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full bg-transparent px-6 py-5 outline-none resize-none text-[17px] leading-normal text-neutral-200 placeholder:text-neutral-500/70"
          rows={1}
        />
        <div className="flex items-center px-3 py-3 border-t border-neutral-800/40">
          <div className="flex items-center">
            <button className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-neutral-400/90 hover:bg-white/5 rounded-full btn-shrink">
              <Focus className="w-4 h-4" />
              Focus
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-neutral-400/90 hover:bg-white/5 rounded-full btn-shrink">
              <Paperclip className="w-4 h-4" />
              Attach
            </button>
          </div>
          <div className="ml-auto flex items-center">
            <Switch 
              checked={isProActive}
              onCheckedChange={setIsProActive}
              className="switch"
            />
            <span className={`text-[13px] ml-3 mr-4 ${isProActive ? 'text-[#21B8CD]' : 'text-neutral-400/90'}`}>
              Pro
            </span>
            <button 
              disabled={!inputValue.trim()}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full bg-[#2D2D2D]/80 text-neutral-400/90 btn-shrink",
                inputValue.trim() ? "hover:bg-[#333333]" : "opacity-50 cursor-not-allowed"
              )}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}