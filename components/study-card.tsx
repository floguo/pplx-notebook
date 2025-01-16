import { Clock, Lock } from 'lucide-react'

interface StudyCardProps {
  title: string
  icon?: React.ReactNode
  isPrivate?: boolean
  isNew?: boolean
  onClick?: () => void
}

export function StudyCard({ title, icon, isPrivate, isNew, onClick }: StudyCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-xl bg-[#1E1E1E] hover:bg-[#252525] transition-colors group"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#2A2A2A] flex items-center justify-center text-gray-400">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-200 truncate group-hover:text-white transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {isNew && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Now</span>
              </div>
            )}
            {isPrivate && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Lock className="w-3.5 h-3.5" />
                <span>Private</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

