interface JapaneseSymbolProps {
    symbol: string
}

export function JapaneseSymbol({ symbol }: JapaneseSymbolProps) {
    return (
        <div className="text-9xl font-bold text-center my-8">
            {symbol}
        </div>
    )
}