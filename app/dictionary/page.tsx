'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/Button'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface LearnedSyllable {
    id: number
    syllable: string
    writing_system: string
    created_at: string
}

const pronunciations: { [key: string]: string } = {
    'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',
    'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
}

export default function Dictionary() {
    const [learnedSyllables, setLearnedSyllables] = useState<LearnedSyllable[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchLearnedSyllables()
    }, [])

    const fetchLearnedSyllables = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const { data, error } = await supabase
                .from('learned_syllables')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                throw new Error(error.message)
            }

            setLearnedSyllables(data || [])
        } catch (err) {
            console.error('Error fetching learned syllables:', err)
            setError('Hubo un problema al cargar las sílabas aprendidas. Por favor, intenta de nuevo.')
        } finally {
            setIsLoading(false)
        }
    }

    const renderSyllables = (writingSystem: string) => {
        const filteredSyllables = learnedSyllables.filter(s => s.writing_system === writingSystem)
        return (
            <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {filteredSyllables.map((syllable) => (
                    <div key={syllable.id} className="border text-center p-4 rounded">
                        <p className="text-2xl font-bold">{syllable.syllable}</p>
                        <p className="text-sm text-gray-600">{pronunciations[syllable.syllable]}</p>
                    </div>
                ))}
            </div>
        )
    }

    if (isLoading) {
        return <div className="container mx-auto mt-10 text-center">Loading...</div>
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Learned Syllables</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                    <p>{error}</p>
                    <Button onClick={fetchLearnedSyllables} className="mt-2">Try Again</Button>
                </div>
            )}
            {learnedSyllables.length === 0 ? (
                <p>No syllables learned yet. Start practicing!</p>
            ) : (
                <>
                    <h2 className="text-xl font-semibold mt-6 mb-3">Hiragana</h2>
                    {renderSyllables('hiragana')}
                    <h2 className="text-xl font-semibold mt-6 mb-3">Katakana</h2>
                    {renderSyllables('katakana')}
                </>
            )}
        </div>
    )
}