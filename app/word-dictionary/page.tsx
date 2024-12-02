import { AddWordForm } from '@/components/AddWordForm'
import { LearnedWordsList } from '@/components/LearnedWordsList'

export default function WordDictionary() {
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Word Dictionary</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Add New Word</h2>
                    <AddWordForm />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Learned Words</h2>
                    <LearnedWordsList />
                </div>
            </div>
        </div>
    )
}