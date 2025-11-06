import { useState } from 'react'
import GovernmentView from './views/GovernmentView'
import PharmaView from './views/PharmaView'
import PublicView from './views/PublicView'

function App() {
  const [currentView, setCurrentView] = useState('government')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* View Selector */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentView('government')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'government'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Government View
            </button>
            <button
              onClick={() => setCurrentView('pharma')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'pharma'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Pharma View
            </button>
            <button
              onClick={() => setCurrentView('public')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'public'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Public View
            </button>
          </div>
        </div>
      </div>

      {/* Render Current View */}
      <div className="container mx-auto">
        {currentView === 'government' && <GovernmentView />}
        {currentView === 'pharma' && <PharmaView />}
        {currentView === 'public' && <PublicView />}
      </div>
    </div>
  )
}

export default App
