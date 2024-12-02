'use client'

import { useState } from 'react'
import { Button } from './Button'

type WritingSystem = 'katakana' | 'hiragana'

interface WritingSystemSelectorProps {
    onSelect: (system: WritingSystem) => void
}

export function WritingSystemSelector({ onSelect }: WritingSystemSelectorProps) {
    const [selected, setSelected] = useState<WritingSystem | null>(null)

    const handleSelect = (system: WritingSystem) => {
        setSelected(system)
        onSelect(system)
    }

    return (
        <div className="flex space-x-4">
            <Button
                onClick={() => handleSelect('katakana')}
                variant={selected === 'katakana' ? 'default' : 'outline'}
            >
                Katakana
            </Button>
            <Button
                onClick={() => handleSelect('hiragana')}
                variant={selected === 'hiragana' ? 'default' : 'outline'}
            >
                Hiragana
            </Button>
        </div>
    )
}