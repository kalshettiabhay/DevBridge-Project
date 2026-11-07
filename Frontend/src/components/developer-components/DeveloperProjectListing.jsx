
import { useEffect, useState } from "react"
import axios from "axios"
import {
  Briefcase,
  Clock,
  DollarSign,
  Globe,
  Eye,
  Calendar,
  MapPin,
  User,
  Filter,
  Search,
  Building2,
  FileText,
} from "lucide-react"

const DeveloperProjectListing = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/developer/getprojects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        console.log(response.data)
        setProjects(response.data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || project.status === filterStatus
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading projects...</p>
          <p className="text-gray-500 text-sm mt-1">Fetching available opportunities</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Projects</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover exciting opportunities and connect with clients looking for your expertise.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Search & Filter Projects</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Projects</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by project type or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Filter */}
              <div className="lg:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="all">All Projects</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-2">
                  <span className="text-sm font-medium text-gray-900">
                    {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} found
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white shadow rounded-lg">
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div key={project._id} className="bg-white shadow rounded-lg hover:shadow-md transition-shadow">
                {/* Project Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {project.projectType === "Web" ? (
                          <Globe className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Briefcase className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {project.projectType} Development Project
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="px-6 py-4">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

                  {/* Project Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <DollarSign className="w-4 h-4 text-green-600" />
                      </div>
                      <span>
                        Budget: <span className="font-semibold text-green-600">₹{project.budget}</span>
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <span>
                        Timeline: <span className="font-semibold text-blue-600">{project.timeline} weeks</span>
                      </span>
                    </div>
                    {project.clientLocation && (
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <span>
                          Location: <span className="font-semibold text-purple-600">{project.clientLocation}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                    <button className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                      <User className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Stats Section */}
        {filteredProjects.length > 0 && (
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Project Statistics</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{filteredProjects.length}</div>
                  <div className="text-sm text-gray-500">Total Projects</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {filteredProjects.filter((p) => p.status === "Open").length}
                  </div>
                  <div className="text-sm text-gray-500">Open Projects</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {filteredProjects.filter((p) => p.projectType === "Web").length}
                  </div>
                  <div className="text-sm text-gray-500">Web Projects</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Building2 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {filteredProjects.filter((p) => p.projectType === "App").length}
                  </div>
                  <div className="text-sm text-gray-500">App Projects</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Status color helper
const getStatusClass = (status) => {
  switch (status) {
    case "Open":
      return "bg-green-100 text-green-800 border border-green-200"
    case "In Progress":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200"
    case "Completed":
      return "bg-blue-100 text-blue-800 border border-blue-200"
    case "Cancelled":
      return "bg-red-100 text-red-800 border border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200"
  }
}

export default DeveloperProjectListing
