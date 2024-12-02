'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Textarea } from '@/components/TextArea'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface LearnedWord {
  id: number
  japanese_word: string
  english_translation: string
  pronunciation: string
  description: string | null
}

export function LearnedWordsList() {
  const [words, setWords] = useState<LearnedWord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editedWord, setEditedWord] = useState<LearnedWord | null>(null)

  const fetchLearnedWords = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('learned_words')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setWords(data || [])
    } catch (err) {
      console.error('Error fetching learned words:', err)
      setError('There was a problem loading the learned words. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLearnedWords()
  }, [])

  const handleEdit = (word: LearnedWord) => {
    setEditingId(word.id)
    setEditedWord(word)
  }

  const handleSave = async () => {
    if (!editedWord) return

    try {
      const { error } = await supabase
        .from('learned_words')
        .update(editedWord)
        .eq('id', editedWord.id)

      if (error) throw error

      setWords(words.map(w => w.id === editedWord.id ? editedWord : w))
      setEditingId(null)
      setEditedWord(null)
    } catch (err) {
      console.error('Error updating word:', err)
      setError('There was a problem updating the word. Please try again.')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('learned_words')
        .delete()
        .eq('id', id)

      if (error) throw error

      setWords(words.filter(w => w.id !== id))
    } catch (err) {
      console.error('Error deleting word:', err)
      setError('There was a problem deleting the word. Please try again.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editedWord) {
      setEditedWord({
        ...editedWord,
        [e.target.name]: e.target.value
      })
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  if (words.length === 0) {
    return <p>No words learned yet. Start adding some words!</p>
  }

  return (
    <div className="space-y-4">
      {words.map((word) => (
        <div key={word.id} className="border p-4 rounded">
          {editingId === word.id ? (
            <>
              <Input
                name="japanese_word"
                value={editedWord?.japanese_word || ''}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Input
                name="english_translation"
                value={editedWord?.english_translation || ''}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Input
                name="pronunciation"
                value={editedWord?.pronunciation || ''}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Textarea
                name="description"
                value={editedWord?.description || ''}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Button onClick={handleSave} className="mr-2">Save</Button>
              <Button onClick={() => setEditingId(null)} variant="outline">Cancel</Button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold">{word.japanese_word}</h3>
              <p className="text-md">{word.english_translation}</p>
              <p className="text-sm text-gray-600">Pronunciation: {word.pronunciation}</p>
              {word.description && <p className="text-sm text-gray-600">{word.description}</p>}
              <div className="mt-2">
                <Button onClick={() => handleEdit(word)} className="mr-2">Edit</Button>
                <Button onClick={() => handleDelete(word.id)} variant="destructive">Delete</Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}