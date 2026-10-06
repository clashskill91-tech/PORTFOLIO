import ProjectCard from './ProjectCard'
import EmptyState from './EmptyState'
import { ProjectSkeletons } from './Loading'
import { useLang } from '../context/LanguageContext'
export default function ProjectGrid({ projects, loading, error, reload }) {
  const { t } = useLang()
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {loading ? <ProjectSkeletons /> : error ? <EmptyState title={error === 'SETUP' ? t('setup') : t('loadError')} action={error !== 'SETUP' && <button onClick={reload} className="btn-ghost">{t('retry')}</button>} />
        : projects.length === 0 ? <EmptyState title={t('noProjects')} hint={t('noProjectsHint')} />
        : projects.map(p => <ProjectCard key={p.id} project={p} />)}
    </div>)
}
