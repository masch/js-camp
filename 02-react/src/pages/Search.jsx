import { useState, useEffect } from 'react'

import { Pagination } from '../components/Pagination.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { JobListings } from '../components/JobListings.jsx'

import jobsData from '../data.json'

const RESULT_PER_PAGE = 4


const useFilters = () => {

    const [filters, setFilters] = useState({
        technology: '',
        location: '',
        experienceLevel: ''
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [textToFilter, setTextToFilter] = useState('')

    const jobFilteredByFilters = jobsData?.filter(job =>
        (filters.technology === '' || job?.data?.technology === filters.technology) &&
        (filters.location === '' || job?.data?.modalidad === filters.location) &&
        (filters.experienceLevel === '' || job?.data?.nivel === filters.experienceLevel)
    )

    const jobsWithTextFilter = textToFilter === "" ? jobFilteredByFilters : jobFilteredByFilters.filter(job =>
        job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
    )

    const totalPages = Math.ceil(jobsWithTextFilter.length / RESULT_PER_PAGE)

    const pageResults = jobsWithTextFilter.slice(
        (currentPage - 1) * RESULT_PER_PAGE,
        currentPage * RESULT_PER_PAGE
    )

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
        pageResults,
        totalPages,
        currentPage,
        handlePageChange,
        handleSearch,
        handleTextFilter,
    }

}

export function SearchPage() {
    const {
        pageResults,
        totalPages,
        currentPage,
        handlePageChange,
        handleSearch,
        handleTextFilter,
    } = useFilters()

    return (

        <main>
            <SearchFormSection
                onSearch={handleSearch}
                onTextFilter={handleTextFilter} />

            <section>

                <JobListings
                    jobs={pageResults}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </section>

        </main >
    )
}

