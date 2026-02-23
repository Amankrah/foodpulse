'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { QuizSection } from '@/types/diet-quiz'

interface ProgressIndicatorProps {
  currentSection: QuizSection
  currentQuestionIndex: number
  totalQuestions: number
  completedSections: QuizSection[]
}

const SECTIONS: { id: QuizSection; label: string; questionCount: number }[] = [
  { id: 'quick', label: 'Quick Profile', questionCount: 3 },
  { id: 'core', label: 'Core Questions', questionCount: 12 },
  { id: 'results', label: 'Your Results', questionCount: 0 },
]

export function ProgressIndicator({
  currentSection,
  currentQuestionIndex,
  totalQuestions,
  completedSections,
}: ProgressIndicatorProps) {
  const progressPercentage = Math.round(
    ((currentQuestionIndex + 1) / totalQuestions) * 100
  )

  const isWelcome = currentSection === 'welcome'
  const isResults = currentSection === 'results'

  if (isWelcome) {
    return null
  }

  return (
    <div className="w-full">
      {/* Section tabs */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {SECTIONS.map((section, index) => {
          const isCompleted = completedSections.includes(section.id)
          const isCurrent = currentSection === section.id
          const isPast =
            SECTIONS.findIndex((s) => s.id === currentSection) > index

          return (
            <div key={section.id} className="flex items-center">
              {index > 0 && (
                <div
                  className={`w-8 h-0.5 mx-1 ${
                    isPast || isCompleted
                      ? 'bg-green-500'
                      : 'bg-neutral-200'
                  }`}
                />
              )}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                        ? 'bg-green-600 text-white ring-4 ring-green-100'
                        : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-xs mt-1 whitespace-nowrap ${
                    isCurrent
                      ? 'text-green-600 font-medium'
                      : 'text-neutral-500'
                  }`}
                >
                  {section.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      {!isResults && (
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-between text-xs text-neutral-500 mb-1">
            <span>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span>{progressPercentage}% complete</span>
          </div>
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
