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

export function AddWordForm() {
    const [japaneseWord, setJapaneseWord] = useState('')
    const [englishTranslation, setEnglishTranslation] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!japaneseWord || !englishTranslation) {
            setError('Japanese word and English translation are required.')
            return
        }

        try {
            const { error } = await supabase
                .from('learned_words')
                .insert({ japanese_word: japaneseWord, english_translation: englishTranslation, description })

            if (error) throw error

            setJapaneseWord('')
            setEnglishTranslation('')
            setDescription('')
            alert('Word added successfully!')
        } catch (err) {
            console.error('Error adding word:', err)
            setError('There was a problem adding the word. Please try again.')
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
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description (optional)"
                />
            </div>
            <Button type="submit">Add Word</Button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    )
}