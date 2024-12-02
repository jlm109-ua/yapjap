'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface LearnedWord {
    id: number
    japanese_word: string
    english_translation: string
    description: string | null
}

export function LearnedWordsList() {
    const [words, setWords] = useState<LearnedWord[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchLearnedWords()
    }, [])

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

    if (isLoading) return <div>Loading...</div>
    if (error) return <div className="text-red-500">{error}</div>

    return (
        <div className="space-y-4">
            {words.length === 0 ? (
                <p>No words learned yet. Start adding some words!</p>
            ) : (
                words.map((word) => (
                    <div key={word.id} className="border p-4 rounded">
                        <h3 className="text-lg font-bold">{word.japanese_word}</h3>
                        <p className="text-md">{word.english_translation}</p>
                        {word.description && <p className="text-sm text-gray-600">{word.description}</p>}
                    </div>
                ))
            )}
        </div>
    )
}