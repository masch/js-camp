import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'

import { Link } from '../components/Link'
import { useAuth } from '../context/AuthContext'

import snarkdown from 'snarkdown'
import styles from './Detail.module.css'

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

function DetailPageBreadCumb({ job }) {
    return (
        <nav className={styles.breadcrumb}>
            <Link
                href="/search"
                className={styles.breadcrumbButton}
            >
                Empleos
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbTitle}>{job.title}</span>
        </nav>
    )
}

function DetailPageHeader({ job }) {
    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.title}>{job.title}</h1>
                <p className={styles.meta}>
                    {job.company} . {job.location}
                </p>
            </header>

            <DetailApplyButton />
        </>
    )
}

function DetailApplyButton() {
    const { isLoggedIn } = useAuth()
    return (
        <button disabled={!isLoggedIn} className={styles.applyButton}>
            {isLoggedIn ? 'Aplicar ahora' : 'Inicia sesión para aplicar'}
        </button>
    )
}

export default function JobDetail() {
    const { jobId } = useParams()
    const navigate = useNavigate()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!jobId) return

        setLoading(true)
        setError(null)

        fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
            .then((response) => {
                if (!response.ok) {
                    navigate('/not-found')
                    return
                }
                return response.json()
            })
            .then((data) => {
                const job = {
                    id: data.id,
                    title: data.titulo,
                    company: data.empresa,
                    location: data.ubicacion,
                    content: data.content?.description || '',
                    responsibilities: data.content?.responsibilities || '',
                    requirements: data.content?.requirements || '',
                    about: data.content?.about || '',
                }
                setJob(job)
            })
            .catch((error) => {
                setError(error.message)
                setJob(null)
            })
            .finally(() => {
                setLoading(false)
            })
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
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
            <div className={styles.container}>
                <DetailPageBreadCumb job={job} />
                <DetailPageHeader job={job} />

                <JobSection title="Descripción del puesto" content={job.content} />
                <JobSection title="Responsabilidades" content={job.responsibilities} />
                <JobSection title="Requisitos" content={job.requirements} />
                <JobSection title="Acerca de la empresa" content={job.about} />
            </div>
        </div>
    )
}
