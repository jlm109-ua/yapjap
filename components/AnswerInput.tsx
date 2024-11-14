'use client'

import { useState } from 'react'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

interface AnswerInputProps {
    onSubmit: (answer: string) => void
}

export function AnswerInput({ onSubmit }: AnswerInputProps) {
    const [answer, setAnswer] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(answer)
        setAnswer('')
    }

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
                type="text"
                value={answer}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)}
                placeholder="Write the pronunciation..."
            />
            <Button type="submit">Check</Button>
        </form>
    )
}