import './ProgressBar.css';

const ProgressBar = ({heading, subtitle, completed, total}) => {

  const progress = total > 0 ? (completed/total) * 100 : 0;

  return (
    <div className='progress-card'>
        <div className="heading" style={{display:"flex", flexDirection:"column", alignItems: "start"}}>
          <h3>{heading}</h3>
          <p style={{color: "var(--muted-foreground)"}}>{subtitle}</p>
        </div>
        <div className='progress-bar-container'>
          <div className='progress-bar-fill' style={{width: `${progress}%`}}>{Math.floor(progress)}%</div>
        </div>
    </div>
  )
}

export default ProgressBar