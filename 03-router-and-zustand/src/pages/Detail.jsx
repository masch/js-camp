import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import snarkdown from 'snarkdown'
import styles from './detail.module.css'

const JobSection = ({ title, content }) => {
    const html = snarkdown(content ?? '')

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <div className={`${styles.sectionContent} ${styles.prose}`}>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </section>
    )
}

export const JobDetail = () => {
    const { jobId } = useParams()
    const navigate = useNavigate()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!jobId) return

        const controller = new AbortController()

        setLoading(true)
        setError(null)

        fetch(`https://tu-api.dev/api/jobs/${jobId}`, {
            signal: controller.signal,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Job not found')
                }
                return response.json()
            })
            .then((data) => {
                setJob(data)
            })
            .catch((error) => {
                if (error.name === 'AbortError') return
                setError(error.message)
                setJob(null)
            })
            .finally(() => {
                setLoading(false)
            })

        return () => {
            controller.abort()
        }
    }, [jobId])

    if (loading) {
        return (
            <div className={styles.loading}>
                <p>Cargando oferta...</p>
            </div>
        )
    }

    if (error || !job) {
        return (
            <div className={styles.notFound}>
                <h1>Oferta no encontrada</h1>
                <p>Puede que esta oferta haya caducado o que la URL no sea correcta.</p>
                <button className={styles.backButton} onClick={() => navigate('/jobs')}>
                    Volver a la lista de empleos
                </button>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <nav className={styles.breadcrumb}>
                <a href="/jobs" className={styles.breadcrumbLink}>
                    Empleos
                </a>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbTitle}>{job.title}</span>
            </nav>

            <header className={styles.header}>
                <h1 className={styles.title}>{job.title}</h1>
                <div className={styles.meta}>
                    <p className={styles.company}>{job.company}</p>
                    <p className={styles.location}>{job.location}</p>
                </div>
                <button className={styles.applyButton}>Aplicar a esta oferta</button>
            </header>

            <JobSection title="Descripción del puesto" content={job.content} />

            <JobSection title="Responsabilidades" content={job.responsibilities} />

            <JobSection title="Requisitos" content={job.requirements} />

            <JobSection title="Acerca de la empresa" content={job.about} />
        </div>
    )
}