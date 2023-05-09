import './TabNavigation.css'

export type ActiveTabState = 'all' | 'favorites'

type Props = {
  activeTab: ActiveTabState
  setActiveTab: (param: ActiveTabState) => void
}

export const TabNavigation = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className="tab">
      <button
        className={activeTab === 'all' ? 'active' : ''}
        onClick={() => setActiveTab('all')}
      >
          All
      </button>
      <button
        className={activeTab === 'favorites' ? 'active' : ''}
        onClick={() => setActiveTab('favorites')}
      >
        Favorites
      </button>
    </div>
  )
}
