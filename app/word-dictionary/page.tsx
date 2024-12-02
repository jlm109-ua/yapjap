'use client'

import { useState } from 'react'
import { AddWordForm } from '@/components/AddWordForm'
import { LearnedWordsList } from '@/components/LearnedWordsList'

export default function WordDictionary() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleWordChange = () => {
    setRefreshKey(prevKey => prevKey + 1)
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-8">Word Dictionary</h1>
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Add New Word</h2>
        <AddWordForm onWordAdded={handleWordChange} />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4">Learned Words</h2>
        <LearnedWordsList key={refreshKey} />
      </div>
    </div>
  )
}