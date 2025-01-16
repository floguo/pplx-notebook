'use client'

import React, { useState } from 'react'
import { Focus, Paperclip, ArrowRight } from 'lucide-react'
import { Switch } from "@/components/ui/switch"

export function Search() {
  const [isProActive, setIsProActive] = useState(false)

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <h1 className="text-[44px] font-medium tracking-[-0.02em] mb-8 text-center text-[#E5E5E5]">
        What do you want to know?
      </h1>
      
      <div className="rounded-2xl border border-gray-700/30 bg-[#202020]/80">
        <textarea
          placeholder="Ask anything..."
          className="w-full bg-transparent px-6 py-5 outline-none resize-none text-[17px] leading-normal text-gray-200 placeholder:text-gray-500/70"
          rows={1}
        />
        <div className="flex items-center px-4 py-3 border-t border-gray-800/40">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-gray-400/90 hover:bg-white/5 rounded-lg btn-shrink">
              <Focus className="w-4 h-4" />
              Focus
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-gray-400/90 hover:bg-white/5 rounded-lg btn-shrink">
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
            <span className={`text-[13px] ml-3 mr-4 ${isProActive ? 'text-[#21B8CD]' : 'text-gray-400/90'}`}>
              Pro
            </span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2D2D2D]/80 hover:bg-[#333333] text-gray-400/90 btn-shrink">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}