import { Clock, Lock } from 'lucide-react'

interface NotebookCardProps {
  title?: string
  icon?: React.ReactNode
  isNew?: boolean
  isPrivate?: boolean
  isUntitled?: boolean
  onTitleChange?: (title: string) => void
  onClick?: () => void
}

export function NotebookCard({ 
  title = "Untitled Notebook",
  icon,
  isNew,
  isPrivate,
  isUntitled,
  onTitleChange,
  onClick
}: NotebookCardProps) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-lg bg-[#202222]/50 border border-neutral-800 hover:bg-[#202222] hover:border-neutral-700 cursor-pointer"
    >
      <div className="w-10 h-10 rounded-lg bg-blue-200/5 flex items-center justify-center text-neutral-400">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        {isUntitled ? (
          <input
            type="text"
            defaultValue={title}
            placeholder="Enter title..."
            className="w-full bg-transparent text-neutral-200 text-base outline-none"
            onChange={(e) => onTitleChange?.(e.target.value)}
            autoFocus
          />
        ) : (
          <div className="text-neutral-200 text-base truncate">{title}</div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {isNew && (
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Now</span>
          </div>
        )}
        {isPrivate && (
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <Lock className="w-3.5 h-3.5" />
            <span>Private</span>
          </div>
        )}
      </div>
    </div>
  )
}

