'use client'

import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import type { QuizQuestion } from '@/types/diet-quiz'

interface QuestionCardProps {
  question: QuizQuestion
  value: string | string[]
  onChange: (value: string | string[]) => void
  onNext: () => void
  onBack: () => void
  isFirst: boolean
  isLast: boolean
  questionNumber: number
  totalQuestions: number
}

export function QuestionCard({
  question,
  value,
  onChange,
  onNext,
  onBack,
  isFirst,
  isLast,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  const isMultiSelect = question.type === 'multi_select'
  const isTimeline = question.type === 'timeline_selector'
  const isSlider = question.type === 'slider'
  const maxSelections = question.maxSelections || question.options.length

  // Timeline state: { morning?, lunch?, dinner? }
  const timelineValue = useMemo(() => {
    if (!isTimeline || typeof value !== 'string' || !value.startsWith('{')) return {} as Record<string, string>
    try {
      return JSON.parse(value) as Record<string, string>
    } catch {
      return {} as Record<string, string>
    }
  }, [isTimeline, value])

  // Slider state: [n1, n2, n3] 0-100
  const sliderValues = useMemo(() => {
    if (!isSlider || typeof value !== 'string') return [50, 50, 50]
    const parts = value.split(',').map((s) => parseInt(s.trim(), 10))
    if (parts.length >= 3 && parts.every((n) => !isNaN(n) && n >= 0 && n <= 100)) return parts.slice(0, 3)
    return [50, 50, 50]
  }, [isSlider, value])

  // Convert value to array for multi-select handling
  const selectedValues = Array.isArray(value) ? value : value ? [value] : []

  const handleOptionSelect = (optionValue: string) => {
    if (isMultiSelect) {
      // Handle "none" option for multi-select
      if (optionValue === 'none') {
        onChange(['none'])
        return
      }

      // If selecting something else, remove "none"
      let newValues = selectedValues.filter((v: string) => v !== 'none')

      if (newValues.includes(optionValue)) {
        // Deselect
        newValues = newValues.filter((v: string) => v !== optionValue)
      } else {
        // Select if under max
        if (newValues.length < maxSelections) {
          newValues = [...newValues, optionValue]
        }
      }

      onChange(newValues)
    } else {
      // Single select
      onChange(optionValue)
    }
  }

  const isOptionSelected = (optionValue: string) => {
    return selectedValues.includes(optionValue)
  }

  const handleTimelineSlotChange = (slotId: string, optionValue: string) => {
    const next = { ...timelineValue, [slotId]: optionValue }
    onChange(JSON.stringify(next))
  }

  const handleSliderChange = (index: number, v: number) => {
    const next = [...sliderValues]
    next[index] = Math.max(0, Math.min(100, v))
    onChange(next.join(','))
  }

  const canProceed = isTimeline
    ? question.timelineSlots?.every((s) => timelineValue[s.id]) ?? false
    : isSlider
      ? true
      : isMultiSelect
        ? selectedValues.length > 0
        : value !== undefined && value !== ''

  // Slider: ensure we have a default value so scoring receives "n1,n2,n3"
  useEffect(() => {
    if (isSlider && (value === undefined || value === '' || (typeof value === 'string' && !/^\d+,\d+,\d+/.test(value)))) {
      onChange('50,50,50')
    }
  }, [isSlider]) // eslint-disable-line react-hooks/exhaustive-deps -- only set default once when question is slider

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canProceed) {
        onNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [canProceed, onNext])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Question Header */}
      <div className="text-center mb-8">
        <span className="text-sm text-green-600 font-medium">
          Question {questionNumber} of {totalQuestions}
        </span>
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mt-2">
          {question.question}
        </h2>
        {question.helpText && (
          <p className="text-neutral-500 mt-2">{question.helpText}</p>
        )}
      </div>

      {/* Options: Timeline, Slider, or choice list */}
      <div className="space-y-3 mb-8">
        {isTimeline && question.timelineSlots && (
          <div className="space-y-6">
            {question.timelineSlots.map((slot) => (
              <div key={slot.id}>
                <p className="text-sm font-medium text-neutral-700 mb-2">{slot.label}</p>
                <div className="flex flex-wrap gap-2">
                  {slot.options.map((opt) => {
                    const isSelected = timelineValue[slot.id] === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleTimelineSlotChange(slot.id, opt.value)}
                        className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                          isSelected
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-neutral-200 hover:border-green-300 hover:bg-neutral-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {isSlider && question.sliderSpectrums && (
          <div className="space-y-6">
            {question.sliderSpectrums.map((spectrum, idx) => (
              <div key={spectrum.id}>
                <div className="flex justify-between text-sm text-neutral-600 mb-1">
                  <span>{spectrum.leftLabel}</span>
                  <span>{spectrum.rightLabel}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sliderValues[idx] ?? 50}
                  onChange={(e) => handleSliderChange(idx, parseInt(e.target.value, 10))}
                  className="w-full h-3 rounded-full appearance-none bg-neutral-200 accent-green-600"
                  aria-label={`${spectrum.leftLabel} to ${spectrum.rightLabel}`}
                />
              </div>
            ))}
          </div>
        )}

        {!isTimeline && !isSlider &&
          question.options.map((option, index) => {
            const isSelected = isOptionSelected(option.value)
            const isDisabled =
              isMultiSelect &&
              !isSelected &&
              selectedValues.length >= maxSelections &&
              option.value !== 'none'

            return (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleOptionSelect(option.value)}
                disabled={isDisabled}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'border-green-500 bg-green-50'
                    : isDisabled
                      ? 'border-neutral-200 bg-neutral-100 opacity-50 cursor-not-allowed'
                      : 'border-neutral-200 hover:border-green-300 hover:bg-neutral-50'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    isSelected ? 'border-green-500 bg-green-500' : 'border-neutral-300'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1">
                  <span className={`font-medium ${isSelected ? 'text-green-700' : 'text-neutral-800'}`}>
                    {option.label}
                  </span>
                  {option.description && (
                    <p className="text-sm text-neutral-500 mt-1">{option.description}</p>
                  )}
                </div>
                {index < 9 && !isMultiSelect && (
                  <span className="text-xs text-neutral-400 font-mono">{index + 1}</span>
                )}
              </motion.button>
            )
          })}
      </div>

      {/* Selection limit indicator for multi-select */}
      {isMultiSelect && maxSelections < question.options.length && (
        <p className="text-center text-sm text-neutral-500 mb-4">
          Selected: {selectedValues.length} / {maxSelections}
        </p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={isFirst}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isFirst
              ? 'text-neutral-300 cursor-not-allowed'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            canProceed
              ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          {isLast ? 'See My Results' : 'Continue'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  )
}
