
import { useState } from "react"
import axios from "axios"

const ClientProjectRequestForm = () => {
  const [formData, setFormData] = useState({
    projectType: "",
    timeline: "",
    description: "",
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/client/project-request", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      alert("Project request submitted successfully!")
      console.log(response.data)
      // Reset form
      setFormData({
        projectType: "",
        timeline: "",
        description: "",
      })
    } catch (err) {
      console.error("Error submitting request:", err)
      alert("Failed to submit project request.")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">New Project Request</h3>
          <p className="text-gray-600">Fill out the details for your new project</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Project Type Section */}
        <div className="bg-gray-50 rounded-xl p-6 space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h4 className="text-lg font-semibold text-gray-900">Project Type</h4>
            <span className="text-red-500">*</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Web Option */}
            <label className={`cursor-pointer ${formData.projectType === "Web" ? "ring-2 ring-blue-500" : ""}`}>
              <input
                type="radio"
                name="projectType"
                value="Web"
                checked={formData.projectType === "Web"}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  formData.projectType === "Web"
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      formData.projectType === "Web" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold transition-colors ${
                        formData.projectType === "Web" ? "text-blue-700" : "text-gray-800"
                      }`}
                    >
                      Web Application
                    </h3>
                    <p className="text-gray-600 text-sm">Desktop & responsive websites</p>
                  </div>
                </div>
              </div>
            </label>

            {/* App Option */}
            <label className={`cursor-pointer ${formData.projectType === "App" ? "ring-2 ring-blue-500" : ""}`}>
              <input
                type="radio"
                name="projectType"
                value="App"
                checked={formData.projectType === "App"}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  formData.projectType === "App"
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      formData.projectType === "App" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold transition-colors ${
                        formData.projectType === "App" ? "text-blue-700" : "text-gray-800"
                      }`}
                    >
                      Mobile Application
                    </h3>
                    <p className="text-gray-600 text-sm">iOS & Android applications</p>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-blue-50 rounded-xl p-6 space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h4 className="text-lg font-semibold text-gray-900">Expected Timeline</h4>
            <span className="text-red-500">*</span>
          </div>

          <div className="space-y-2">
            <input
              type="number"
              name="timeline"
              placeholder="Enter timeline in weeks (e.g., 4)"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
            <p className="text-gray-600 text-sm">Approximate timeline for project completion in weeks</p>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-purple-50 rounded-xl p-6 space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h4 className="text-lg font-semibold text-gray-900">Project Description</h4>
            <span className="text-red-500">*</span>
          </div>

          <div className="space-y-2">
            <textarea
              name="description"
              rows={6}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project requirements, features, target audience, and any specific expectations. Be as detailed as possible to help developers understand your vision."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              required
            />
            <p className="text-gray-600 text-sm">Detailed description helps developers provide better proposals</p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setFormData({ projectType: "", timeline: "", description: "" })}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Submit Project Request</span>
          </button>
        </div>
      </form>

      {/* Info Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">What happens next?</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Your project request will be reviewed by our team</li>
              <li>• Verified developers will receive your project details</li>
              <li>• You'll receive proposals within 24-48 hours</li>
              <li>• Choose the best developer and start your project</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientProjectRequestForm