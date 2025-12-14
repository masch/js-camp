import { useState } from 'react'

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
                <h3>{job?.titulo}</h3>
                <small>{job?.empresa} - {job?.ubicacion}</small>
                <p>{job?.descripcion}</p>
            </div>
            <button
                disabled={isApplied}
                className={buttonClass}
                onClick={handleClick}>{buttonText}</button>
        </article>
    )
}