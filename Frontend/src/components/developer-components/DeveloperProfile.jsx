"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import DeveloperProfileView from "./DeveloperProfileView"

const DeveloperProfile = () => {
  // State for DeveloperProfileSchema fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentRole: "",
    yearsOfExperience: "",
    availability: "",
    country: "",
    city: "",
    bio: "",
    githubUrl: "",
    linkedInUrl: "",
    portfolioUrl: "",
    avatarUrl: "",
    avatarFile: null,
    technologyStack: [],
    famousProjects: [],
    teamAchievements: [],
    resume: null,
    resumeUrl: "",
  })

  // Original data fetched from the server
  const [originalProfileData, setOriginalProfileData] = useState(null)
  const [profileExists, setProfileExists] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // States for adding new items
  const [techInput, setTechInput] = useState("")
  const [project, setProject] = useState({ title: "", description: "" })
  const [achievement, setAchievement] = useState({ title: "", description: "" })

  // General Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // File Change Handler
  const handleFileChange = (e) => {
    const { name, files } = e.target
    const file = files[0]
    if (!file) return

    if (name === "resume") {
      if (file.type === "application/pdf") {
        setFormData((prevData) => ({ ...prevData, resume: file }))
      } else {
        alert("Please upload a PDF file only for your resume.")
        e.target.value = ""
      }
    } else if (name === "avatar") {
      const imageUrl = URL.createObjectURL(file)
      setFormData((prevData) => ({
        ...prevData,
        avatarUrl: imageUrl,
        avatarFile: file,
      }))
    }
  }

  // Technology Stack Handlers
  const handleAddTech = (e) => {
    if (e.key === "Enter" && techInput.trim()) {
      e.preventDefault()
      if (!formData.technologyStack.includes(techInput.trim())) {
        setFormData((prevData) => ({
          ...prevData,
          technologyStack: [...prevData.technologyStack, techInput.trim()],
        }))
        setTechInput("")
      }
    }
  }

  const removeTech = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      technologyStack: prevData.technologyStack.filter((_, i) => i !== index),
    }))
  }

  // Project Handlers
  const addProject = () => {
    if (project.title.trim() && project.description.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        famousProjects: [...prevData.famousProjects, project],
      }))
      setProject({ title: "", description: "" })
    } else {
      alert("Please enter both title and description for the project.")
    }
  }

  const removeProject = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      famousProjects: prevData.famousProjects.filter((_, i) => i !== index),
    }))
  }

  // Achievement Handlers
  const addAchievement = () => {
    if (achievement.description.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        teamAchievements: [...prevData.teamAchievements, achievement],
      }))
      setAchievement({ title: "", description: "" })
    } else {
      alert("Please enter a description for the achievement.")
    }
  }

  const removeAchievement = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      teamAchievements: prevData.teamAchievements.filter((_, i) => i !== index),
    }))
  }

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/developer/profile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      const savedProfile = response.data
      setFormData(savedProfile)
      setOriginalProfileData(savedProfile)
      setProfileExists(true)
      setIsEditing(false)
      alert(profileExists ? "Profile updated successfully!" : "Profile created successfully!")
    } catch (error) {
      console.error("Error saving profile:", error.response?.data?.message || error.message)
      alert(`Error saving profile: ${error.response?.data?.message || error.message}`)
    }
  }

  // Fetch Profile Data
  useEffect(() => {
    const fetchDeveloperProfile = async () => {
      setLoading(true)
      try {
        const response = await axios.get("/api/developer/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (response.data && Object.keys(response.data).length > 0) {
          const fetchedData = response.data
          // Parse arrays if they come as strings
          if (typeof fetchedData.technologyStack === "string") {
            fetchedData.technologyStack = JSON.parse(fetchedData.technologyStack)
          }
          if (typeof fetchedData.famousProjects === "string") {
            fetchedData.famousProjects = JSON.parse(fetchedData.famousProjects)
          }
          if (typeof fetchedData.teamAchievements === "string") {
            fetchedData.teamAchievements = JSON.parse(fetchedData.teamAchievements)
          }
          setFormData(fetchedData)
          setOriginalProfileData(fetchedData)
          setProfileExists(true)
          setIsEditing(false)
        } else {
          setProfileExists(false)
          setIsEditing(true)
        }
      } catch (error) {
        console.error("Error fetching developer profile:", error.response?.data?.message || error.message)
        setProfileExists(false)
        setIsEditing(true)
      } finally {
        setLoading(false)
      }
    }

    fetchDeveloperProfile()
  }, [])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    if (originalProfileData) {
      setFormData(originalProfileData)
      setTechInput("")
      setProject({ title: "", description: "" })
      setAchievement({ title: "", description: "" })
      setIsEditing(false)
    } else {
      setFormData({
        fullName: "",
        email: "",
        currentRole: "",
        yearsOfExperience: "",
        availability: "",
        country: "",
        city: "",
        bio: "",
        githubUrl: "",
        linkedInUrl: "",
        portfolioUrl: "",
        avatarUrl: "",
        avatarFile: null,
        technologyStack: [],
        famousProjects: [],
        teamAchievements: [],
        resume: null,
        resumeUrl: "",
      })
      setTechInput("")
      setProject({ title: "", description: "" })
      setAchievement({ title: "", description: "" })
      setProfileExists(false)
      setIsEditing(true)
    }
  }

  // Input Field Definitions
  const inputFields = [
    { name: "fullName", placeholder: "Full Name", required: true },
    { name: "email", placeholder: "Email Address", required: true, type: "email" },
    {
      name: "currentRole",
      placeholder: "Current Role",
      type: "select",
      options: [
        "Frontend Developer",
        "Backend Developer",
        "Fullstack Developer",
        "DevOps Engineer",
        "QA Engineer",
        "UI/UX Designer",
        "Data Scientist",
        "Mobile Developer",
        "Game Developer",
        "Other",
      ],
      required: true,
    },
    {
      name: "yearsOfExperience",
      placeholder: "Years of Experience",
      type: "select",
      options: ["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"],
      required: true,
    },
    {
      name: "availability",
      placeholder: "Availability",
      type: "select",
      options: ["Full-time", "Part-time", "Contract", "Freelance", "Unavailable"],
    },
    { name: "country", placeholder: "Country", required: true },
    { name: "city", placeholder: "City" },
    { name: "githubUrl", placeholder: "GitHub URL", type: "url" },
    { name: "linkedInUrl", placeholder: "LinkedIn URL", type: "url" },
    { name: "portfolioUrl", placeholder: "Portfolio URL", type: "url" },
  ]

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading developer profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Developer Profile</h1>
                <p className="mt-1 text-sm text-gray-500">
                  {profileExists && !isEditing
                    ? "Manage your professional developer profile and showcase your expertise."
                    : profileExists
                      ? "Update your professional information and skills."
                      : "Create your professional developer profile to get started."}
                </p>
              </div>
              {!isEditing && profileExists && (
                <button
                  onClick={handleEditClick}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Personal Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Information */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Basic information about yourself</p>
                  </div>
                  <div className="px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {inputFields.map((field) => (
                        <div key={field.name} className="col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {field.placeholder}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {field.type === "select" ? (
                            <select
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleChange}
                              required={field.required}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                              <option value="">Select {field.placeholder}</option>
                              {field.options.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              name={field.name}
                              type={field.type || "text"}
                              placeholder={field.placeholder}
                              value={formData[field.name]}
                              onChange={handleChange}
                              required={field.required}
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Bio Section */}
                    <div className="mt-8">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
                      <textarea
                        name="bio"
                        placeholder="Tell us about yourself, your experience, and what makes you unique as a developer..."
                        value={formData.bio}
                        onChange={handleChange}
                        maxLength={1000}
                        rows={4}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                      />
                      <div className="text-right text-sm text-gray-500 mt-1">{formData.bio.length}/1000 characters</div>
                    </div>
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Technology Stack</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Add your technical skills and technologies</p>
                  </div>
                  <div className="px-6 py-6">
                    <div className="border border-gray-300 rounded-md p-4 min-h-[120px]">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.technologyStack.map((tech, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTech(index)}
                              className="text-blue-600 hover:text-red-600 transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={handleAddTech}
                        placeholder="Type a technology and press Enter..."
                        className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Projects */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Featured Projects</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Showcase your best work and projects</p>
                  </div>
                  <div className="px-6 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                        <input
                          type="text"
                          placeholder="Enter project title..."
                          value={project.title}
                          onChange={(e) => setProject({ ...project, title: e.target.value })}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
                        <textarea
                          placeholder="Describe your project..."
                          value={project.description}
                          onChange={(e) => setProject({ ...project, description: e.target.value })}
                          maxLength={500}
                          rows={3}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addProject}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Add Project
                    </button>

                    {formData.famousProjects.length > 0 && (
                      <div className="mt-6 space-y-4">
                        <h4 className="text-sm font-medium text-gray-900">Your Projects:</h4>
                        <div className="space-y-4">
                          {formData.famousProjects.map((p, idx) => (
                            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-md p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900 mb-2">{p.title}</h5>
                                  <p className="text-gray-600 text-sm">{p.description}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeProject(idx)}
                                  className="text-red-600 hover:text-red-800 ml-4 transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Professional Achievements</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Highlight your accomplishments and recognitions
                    </p>
                  </div>
                  <div className="px-6 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Achievement Title (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="Enter achievement title..."
                          value={achievement.title}
                          onChange={(e) => setAchievement({ ...achievement, title: e.target.value })}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Achievement Description</label>
                        <textarea
                          placeholder="Describe your achievement..."
                          value={achievement.description}
                          onChange={(e) => setAchievement({ ...achievement, description: e.target.value })}
                          maxLength={500}
                          rows={3}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addAchievement}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Add Achievement
                    </button>

                    {formData.teamAchievements.length > 0 && (
                      <div className="mt-6 space-y-4">
                        <h4 className="text-sm font-medium text-gray-900">Your Achievements:</h4>
                        <div className="space-y-4">
                          {formData.teamAchievements.map((a, idx) => (
                            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-md p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  {a.title && <h5 className="font-medium text-gray-900 mb-2">{a.title}</h5>}
                                  <p className="text-gray-600 text-sm">{a.description}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeAchievement(idx)}
                                  className="text-red-600 hover:text-red-800 ml-4 transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Profile & Files */}
              <div className="lg:col-span-1 space-y-8">
                {/* Profile Picture */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Picture</h3>
                  </div>
                  <div className="px-6 py-6">
                    <div className="text-center">
                      {formData.avatarUrl ? (
                        <img
                          src={formData.avatarUrl || "/placeholder.svg"}
                          alt="Profile"
                          className="mx-auto h-32 w-32 rounded-full object-cover border-4 border-gray-200"
                        />
                      ) : (
                        <div className="mx-auto h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg
                            className="h-16 w-16 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="mt-4">
                        <input
                          type="file"
                          name="avatar"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Resume</h3>
                    <p className="mt-1 text-sm text-gray-500">Upload your resume (PDF format)</p>
                  </div>
                  <div className="px-6 py-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="mt-4">
                        <input
                          type="file"
                          name="resume"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="sr-only"
                          id="resume-upload"
                        />
                        <label
                          htmlFor="resume-upload"
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Choose File
                        </label>
                        <p className="mt-2 text-sm text-gray-500">PDF files only (max 10MB)</p>
                      </div>
                    </div>
                    {formData.resume && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="ml-2 text-sm font-medium text-green-800">
                            Selected: {formData.resume.name}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  {profileExists && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {profileExists ? "Update Profile" : "Create Profile"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <DeveloperProfileView profileData={formData} onEditClick={handleEditClick} />
        )}
      </div>
    </div>
  )
}

export default DeveloperProfile
