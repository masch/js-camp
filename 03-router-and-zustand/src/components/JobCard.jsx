import { useState } from 'react'
import { Link } from './Link.jsx'
import styles from './JobCard.module.css'

export function JobCard({ job }) {
    const [isApplied, setIsApplied] = useState(false);

    function handleClick() {
        setIsApplied(true);
    }

    const buttonText = isApplied ? 'Aplicado' : 'Aplicar'
    const buttonClass = isApplied ? 'button-apply-job is-applied' : 'button-apply-job'

    return (
        <article className="job-listing-card" data-modalidad={job?.modalidad} data-nivel={job?.nivel} data-technology={job?.technology}>
            <div>
                <h3>
                    <Link className={styles.title} href={`/jobs/${job?.id}`}>
                        {job?.titulo}
                    </Link>
                </h3>
                <small>{job?.empresa} - {job?.ubicacion}</small>
                <p>{job?.descripcion}</p>
            </div>
            <div className={styles.actions}>
                <Link className={styles.details} href={`/jobs/${job?.id}`}>Ver detalle</Link>
                <button
                    disabled={isApplied}
                    className={buttonClass}
                    onClick={handleClick}>{buttonText}
                </button>
            </div>
        </article>
    )
}