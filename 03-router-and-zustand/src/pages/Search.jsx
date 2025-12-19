import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'

import { Pagination } from '../components/Pagination.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { JobListings } from '../components/JobListings.jsx'
import { useRouter } from '../hooks/useRouter.jsx'

const RESULT_PER_PAGE = 4

const useFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [filters, setFilters] = useState(() => {
        return {
            technology: searchParams.get('technology') || '',
            location: searchParams.get('type') || '',
            experienceLevel: searchParams.get('level') || ''
        }
    })

    const [textToFilter, setTextToFilter] = useState(() => {
        return searchParams.get('text') || ''
    })

    const [currentPage, setCurrentPage] = useState(() => {
        const page = Number(searchParams.get('page'))
        return Number.isNaN(page) ? page : 1
    })

    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { navigateTo } = useRouter()

    useEffect(() => {
        async function fetchJobs() {
            try {
                setLoading(true)

                const params = new URLSearchParams()
                if (textToFilter) params.append('text', textToFilter)
                if (filters.technology) params.append('technology', filters.technology)
                if (filters.location) params.append('type', filters.location)
                if (filters.experienceLevel) params.append('level', filters.experienceLevel)

                const offset = (currentPage - 1) * RESULT_PER_PAGE
                params.append('offset', offset)
                params.append('limit', RESULT_PER_PAGE)

                const queryParams = params.toString()

                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
                const json = await response.json()
                setJobs(json.data)
                setTotal(json.total)
            } catch (error) {
                console.error('Error fetching jobs:', error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [filters, textToFilter, currentPage])

    useEffect(() => {
        setSearchParams(() => {
            // Clear all existing params
            const params = new URLSearchParams()
            // Add only needed params
            if (textToFilter) params.append('text', textToFilter)
            if (filters.technology) params.append('technology', filters.technology)
            if (filters.location) params.append('type', filters.location)
            if (filters.experienceLevel) params.append('level', filters.experienceLevel)

            if (currentPage > 1) params.append('page', currentPage)

            return params
        })
    }, [filters, textToFilter, currentPage, setSearchParams])

    const totalPages = Math.ceil(total / RESULT_PER_PAGE)

    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSearch = (filters) => {
        setFilters(filters)
        setCurrentPage(1)
    }

    const handleTextFilter = (newTextToFilter) => {
        setTextToFilter(newTextToFilter)
        setCurrentPage(1)
    }

    return {
        loading,
        error,
        jobs,
        total,
        totalPages,
        currentPage,
        textToFilter,
        handlePageChange,
        handleSearch,
        handleTextFilter,
    }

}

export function SearchPage() {
    const {
        loading,
        error,
        jobs,
        totalPages,
        currentPage,
        textToFilter,
        handlePageChange,
        handleSearch,
        handleTextFilter,
    } = useFilters()


    const getTitle = () => {
        if (loading) return 'Cargando empleos...'
        if (error) return 'Error al cargar empleos'
        if (jobs.length === 0) return 'No se encontraron empleos'
        return `${jobs.length} empleos disponibles - DevJobs`
    }

    return (

        <main>
            <title>{getTitle()}</title>
            <SearchFormSection
                initialText={textToFilter}
                onSearch={handleSearch}
                onTextFilter={handleTextFilter}
            />

            <section>
                <h2 style={{ textAlign: 'center' }}>Resultados de búsqueda</h2>

                {
                    loading ? <p>Cargando...</p> : <JobListings jobs={jobs} />
                }
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </section>

        </main >
    )
}

