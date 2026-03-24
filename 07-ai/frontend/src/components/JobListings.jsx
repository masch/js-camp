import { JobCard } from './JobCard.jsx'

export function JobListings({ jobs }) {
    return <>
        <div className="jobs-listings">
            {
                jobs.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '2rem', textWrap: 'balance' }}>No se encontraron resultados</p>
                ) : (
                    jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))
                )
            }
        </div>
    </>
}