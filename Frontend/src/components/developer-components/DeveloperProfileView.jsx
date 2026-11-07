
const DeveloperProfileView = ({ profileData, onEditClick }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {profileData.avatarUrl && (
                <img
                  src={profileData.avatarUrl || "/placeholder.svg"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                />
              )}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profileData.fullName}</h1>
                <p className="text-xl text-gray-600 mb-3">{profileData.currentRole}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {profileData.yearsOfExperience}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z"
                      />
                    </svg>
                    {profileData.availability}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {profileData.city}, {profileData.country}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        {profileData.bio && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">About</h2>
            </div>
            <div className="px-6 py-6">
              <p className="text-gray-700 leading-relaxed text-base">{profileData.bio}</p>
            </div>
          </div>
        )}

        {/* Technology Stack */}
        {profileData.technologyStack && profileData.technologyStack.length > 0 && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Technology Stack</h2>
            </div>
            <div className="px-6 py-6">
              <div className="flex flex-wrap gap-3">
                {profileData.technologyStack.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects */}
        {profileData.famousProjects && profileData.famousProjects.length > 0 && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Featured Projects</h2>
            </div>
            <div className="px-6 py-6">
              <div className="space-y-6">
                {profileData.famousProjects.map((project, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6 py-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements */}
        {profileData.teamAchievements && profileData.teamAchievements.length > 0 && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Professional Achievements</h2>
            </div>
            <div className="px-6 py-6">
              <div className="space-y-6">
                {profileData.teamAchievements.map((achievement, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-6 py-2">
                    {achievement.title && (
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                    )}
                    <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Contact & Links */}
      <div className="lg:col-span-1 space-y-8">
        {/* Contact Information */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
          </div>
          <div className="px-6 py-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <p className="text-gray-900">{profileData.email}</p>
            </div>
            {profileData.githubUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">GitHub</label>
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors break-all"
                >
                  {profileData.githubUrl}
                </a>
              </div>
            )}
            {profileData.linkedInUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">LinkedIn</label>
                <a
                  href={profileData.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors break-all"
                >
                  {profileData.linkedInUrl}
                </a>
              </div>
            )}
            {profileData.portfolioUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Portfolio</label>
                <a
                  href={profileData.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors break-all"
                >
                  {profileData.portfolioUrl}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Profile Summary</h2>
          </div>
          <div className="px-6 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Technologies</span>
              <span className="text-sm font-medium text-gray-900">
                {profileData.technologyStack ? profileData.technologyStack.length : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Projects</span>
              <span className="text-sm font-medium text-gray-900">
                {profileData.famousProjects ? profileData.famousProjects.length : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Achievements</span>
              <span className="text-sm font-medium text-gray-900">
                {profileData.teamAchievements ? profileData.teamAchievements.length : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeveloperProfileView
