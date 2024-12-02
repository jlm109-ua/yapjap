'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Textarea } from '@/components/TextArea'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface AddWordFormProps {
  onWordAdded: () => void;
}

export function AddWordForm({ onWordAdded }: AddWordFormProps) {
  const [japaneseWord, setJapaneseWord] = useState('')
  const [englishTranslation, setEnglishTranslation] = useState('')
  const [pronunciation, setPronunciation] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: null, message: '' })

    if (!japaneseWord || !englishTranslation || !pronunciation) {
      setStatus({ type: 'error', message: 'Japanese word, English translation, and pronunciation are required.' })
      return
    }

    try {
      const { error } = await supabase
        .from('learned_words')
        .insert({ japanese_word: japaneseWord, english_translation: englishTranslation, pronunciation, description })

      if (error) throw error

      setJapaneseWord('')
      setEnglishTranslation('')
      setPronunciation('')
      setDescription('')
      setStatus({ type: 'success', message: 'Word added successfully!' })
      onWordAdded()
    } catch (err) {
      console.error('Error adding word:', err)
      setStatus({ type: 'error', message: 'There was a problem adding the word. Please try again.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          value={japaneseWord}
          onChange={(e) => setJapaneseWord(e.target.value)}
          placeholder="Japanese Word"
          required
        />
      </div>
      <div>
        <Input
          type="text"
          value={englishTranslation}
          onChange={(e) => setEnglishTranslation(e.target.value)}
          placeholder="English Translation"
          required
        />
      </div>
      <div>
        <Input
          type="text"
          value={pronunciation}
          onChange={(e) => setPronunciation(e.target.value)}
          placeholder="Pronunciation"
          required
        />
      </div>
      <div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
        />
      </div>
      <Button type="submit">Add Word</Button>
      {status.type && (
        <div className={`mt-4 p-2 ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded`}>
          {status.message}
        </div>
      )}
    </form>
  )
}