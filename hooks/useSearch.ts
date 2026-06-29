"use client"

import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { searchEngineOutputProps } from '../utils/searchEngine';

export const useSearch = () => {
    const [searchInput, setSearchInput] = useState<string>('')
    const [searchResult, setSearchResult] = useState<{ dataBaseName: string; result: searchEngineOutputProps }[] | undefined>()
    const [isSearchFocus, setSearchFocus] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { t: t_common } = useTranslation('common')

    const performSearch = useCallback(async (input: string) => {
        const { searchEngine } = await import('../utils/searchEngine')

        const trimmedInput = input.trim()
        if (!trimmedInput) {
            setSearchResult(undefined)
            setSearchFocus(false)
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        const blogRes = await searchEngine(trimmedInput)
        const { GitHubInspirationGateway } = await import('@/packages/modules/inspiration/infrastructure/github-inspiration.gateway')
        const inspireRes = await searchEngine(trimmedInput, await (new GitHubInspirationGateway()).getInspirationList() as any)
        setIsLoading(false)
        setSearchFocus(true)
        const res = [
            {
                dataBaseName: t_common('blog'),
                result: blogRes
            },
            {
                dataBaseName: t_common('inspiration'),
                result: inspireRes
            }
        ]

        setSearchInput(trimmedInput)
        setSearchResult(res)
    }, [])

    return {
        searchInput,
        searchResult,
        isSearchFocus,
        setSearchFocus,
        performSearch,
        isLoading
    }
}
