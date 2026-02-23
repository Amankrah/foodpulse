'use client'

import { motion } from 'framer-motion'
import { Sparkles, Clock, Shield, Target } from 'lucide-react'

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto text-center"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          Discover Your Ideal Diet
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed">
          This isn&apos;t another generic diet quiz. We&apos;ll match you with sustainable
          eating approaches based on your unique lifestyle, values, health needs,
          and practical constraints.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="p-4 bg-green-50 rounded-xl">
          <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-neutral-900">5-7 Minutes</h3>
          <p className="text-sm text-neutral-600">Quick but comprehensive</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl">
          <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-neutral-900">Personalized</h3>
          <p className="text-sm text-neutral-600">Tailored to your life</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl">
          <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-neutral-900">Evidence-Based</h3>
          <p className="text-sm text-neutral-600">Backed by science</p>
        </div>
      </div>

      {/* What to expect */}
      <div className="bg-neutral-50 rounded-2xl p-6 mb-8 text-left">
        <h3 className="font-semibold text-neutral-900 mb-3">What to expect:</h3>
        <ul className="space-y-2 text-neutral-600">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">1.</span>
            <span>15 questions about your goals, lifestyle, and preferences</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">2.</span>
            <span>A compatibility spectrum showing how well different diets match you</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">3.</span>
            <span>Personalized recommendations with an implementation roadmap</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">4.</span>
            <span>Predicted barriers and solutions specific to your situation</span>
          </li>
        </ul>
      </div>

      {/* Important note */}
      <p className="text-sm text-neutral-500 mb-8">
        <strong>Note:</strong> This quiz provides educational guidance, not medical
        advice. Always consult a healthcare professional before making significant
        dietary changes, especially if you have health conditions.
      </p>

      {/* Start button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="w-full md:w-auto px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
      >
        Start the Quiz
      </motion.button>
    </motion.div>
  )
}
