// app/dictionary/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Dictionary() {
    const [learnedSyllables, setLearnedSyllables] = useState<any[]>([])

    useEffect(() => {
        fetchLearnedSyllables()
    }, [])

    const fetchLearnedSyllables = async () => {
        const { data, error } = await supabase
            .from('learned_syllables')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching learned syllables:', error)
        } else {
            setLearnedSyllables(data || [])
        }
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Learned syllables</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {learnedSyllables.map((syllable) => (
                    <div key={syllable.id} className="border p-4 rounded">
                        <p className="text-2xl font-bold">{syllable.syllable}</p>
                        <p className="text-sm text-gray-600">{syllable.writing_system}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}