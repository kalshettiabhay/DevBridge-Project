
import { useState } from "react"
import ClientProjectRequestForm from "./ClientProjectRequestForm"
import MyProjectRequests from "./MyProjectRequests"

const TabsNavigation = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const renderTabContent = () => {
    switch (activeTab) {
      case "projects":
        return <ClientProjectRequestForm />
      case "settings":
        return <MyProjectRequests />
      default:
        return (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Get started by exploring your projects or managing your settings. This is your central hub for all
                project-related activities.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <button
                  onClick={() => setActiveTab("projects")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create New Project
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  View My Projects
                </button>
              </div>
            </div>
          </div>
        )
    }
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "🏠" },
    { id: "projects", label: "New Project", icon: "➕" },
    { id: "settings", label: "My Projects", icon: "📋" },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 px-4">
      {/* Professional Tab Header */}
      <div className="bg-white rounded-t-2xl border border-gray-200 shadow-lg">
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-8 py-5 font-semibold text-sm transition-all duration-300 ease-in-out
                first:rounded-tl-2xl last:rounded-tr-2xl
                hover:bg-gray-50 flex items-center space-x-2
                ${
                  activeTab === tab.id
                    ? "text-blue-600 bg-blue-50 border-b-3 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Professional Tab Content */}
      <div className="bg-white rounded-b-2xl border-l border-r border-b border-gray-200 shadow-lg min-h-[500px]">
        <div className="p-8">{renderTabContent()}</div>
      </div>
    </div>
  )
}

export default TabsNavigation
