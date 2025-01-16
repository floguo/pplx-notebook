'use client'

import { useState } from 'react'

export function NoteEditor() {
  const [content, setContent] = useState('')

  return (
    <div className="flex-1 relative">
      <div className="w-[800px] ml-[300px]">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type '/' for commands"
          className="w-full h-full min-h-[calc(100vh-180px)] bg-transparent text-neutral-200 text-base resize-none outline-none placeholder:text-neutral-500"
          autoFocus
        />
      </div>
    </div>
  )
} 