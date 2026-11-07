
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientProfileView from './ClientProfileView'; // Import the new view component

const ClientProfile = () => {
    // State for ClientProfileSchema fields
    const [clientProfileData, setClientProfileData] = useState({
        businessName: '',
        industry: '',
        businessType: '',
        foundedYear: '',
        companySize: '',
        websiteUrl: '',
        linkedInPage: '',
        businessEmail: '',
        country: '',
        stateOrRegion: '',
        city: '',
        aboutBusiness: '',
        logoUrl: '',
        designExperience: '',
        additionalDetails: '',
    });

    // Original data fetched from the server, used to revert if editing is cancelled
    const [originalProfileData, setOriginalProfileData] = useState(null);

    // State to manage if a profile exists (meaning we fetched it successfully)
    const [profileExists, setProfileExists] = useState(false);
    // State to manage loading status
    const [loading, setLoading] = useState(true);
    // State to toggle between view mode and edit mode
    // IMPORTANT: Initial state depends on whether profile exists after fetch.
    // We'll set this in useEffect. For now, a default.
    const [isEditing, setIsEditing] = useState(false);

    const handleClientProfileChange = (e) => {
        const { name, value } = e.target;
        setClientProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setClientProfileData(prevData => ({
                ...prevData,
                logoUrl: imageUrl
            }));
            // In a real app, you'd upload the file and get a permanent URL.
        }
    };

    // --- EFFECT HOOK FOR FETCHING PROFILE DATA ---
    useEffect(() => {
        const fetchClientProfile = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/client-profiles', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data && Object.keys(response.data).length > 0) {
                    setClientProfileData(response.data);
                    setOriginalProfileData(response.data); // Store original data
                    setProfileExists(true);
                    setIsEditing(false); 
                } else {
                    setProfileExists(false);
                    setIsEditing(true); // If no profile, start in edit mode to create one
                }
            } catch (error) {
                console.error('Error fetching client profile:', error.response?.data?.message || error.message);
                // If there's an error (e.g., 404 Not Found), assume profile doesn't exist
                setProfileExists(false);
                setIsEditing(true); // If error, treat as no profile and allow creation
            } finally {
                setLoading(false);
            }
        };

        fetchClientProfile();
    }, []);

    // --- HANDLERS FOR PROFILE ACTIONS ---

    const handleSaveProfile = async () => {
        try {
            let response;
            if (profileExists) {
                // If profile exists, update it
                response = await axios.post('/api/client-profiles', clientProfileData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                alert('Profile Updated Successfully!');
            } else {
                // If profile doesn't exist, create it
                response = await axios.post('/api/client-profiles', clientProfileData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                alert('Profile Created Successfully!');
            }

            const savedProfile = response.data;
            console.log('Profile saved successfully:', savedProfile);
            setClientProfileData(savedProfile);
            setOriginalProfileData(savedProfile); // Update original data after save
            setProfileExists(true);
            setIsEditing(false); // Go back to view mode after saving
        } catch (error) {
            console.error('Error saving profile:', error.response?.data?.message || error.message);
            alert(`Error saving profile: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true); // Switch to edit mode
    };

    const handleCancelEdit = () => {
        if (originalProfileData) {
            setClientProfileData(originalProfileData); // Revert to original data
            setIsEditing(false); // Go back to view mode
        } else {
            // If there was no original data, it means they were creating a new profile.
            // Clicking cancel in this scenario should probably just clear the form
            // and keep them in edit mode until they save or navigate away.
            setClientProfileData({
                businessName: '', industry: '', businessType: '', foundedYear: '',
                companySize: '', websiteUrl: '', linkedInPage: '', businessEmail: '',
                country: '', stateOrRegion: '', city: '', aboutBusiness: '', logoUrl: '',
                designExperience: '', additionalDetails: '',
            });
            setIsEditing(true); // Keep in edit mode to allow them to retry creation
            alert("Changes cancelled. You can now start fresh to create your profile.");
        }
    };

    // --- ENUM OPTIONS ---
    const industryOptions = [
        "Healthcare", "Education", "Retail", "Finance", "Real Estate",
        "Technology", "Logistics", "Hospitality", "Entertainment",
        "Manufacturing", "Other"
    ];

    const businessTypeOptions = [
        "Startup", "Small Business", "Corporation", "NGO", "Freelancer", "Other"
    ];

    const companySizeOptions = ["1-10", "11-50", "51-200", "201-500", "500+"];

    const currentYear = new Date().getFullYear();

    // --- CONDITIONAL RENDERING FOR LOADING STATE ---
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-xl font-medium">Loading client profile...</p>
                </div>
            </div>
        );
    }

    // --- MAIN RENDER LOGIC ---
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-8 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                    {/* Conditional Rendering: Show Edit Form or View Details */}
                    {isEditing ? (
                        // --- EDIT MODE: FULL FORM ---
                        <>
                            {/* Header Section */}
                            <div className="bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 px-8 py-8">
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl group mb-6">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={clientProfileData.logoUrl || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop&crop=center'}
                                            alt="Business Logo"
                                        />
                                        <label
                                            htmlFor="profile-upload"
                                            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                                        >
                                            <div className="text-center">
                                                <div className="w-8 h-8 mx-auto mb-1 bg-white/20 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                Change Photo
                                            </div>
                                            <input
                                                id="profile-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                            />
                                        </label>
                                    </div>
                                    <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                                        {clientProfileData.businessName || 'Your Business Profile'}
                                    </h1>
                                    <p className="text-blue-200 text-lg">{profileExists ? 'Edit Business Profile' : 'Create Business Profile'}</p>
                                </div>
                            </div>

                            {/* Form Content */}
                            <div className="p-8">
                                {/* Business Information Section */}
                                <div className="mb-8">
                                    <div className="flex items-center mb-6">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent">Business Information</h3>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Business Name */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Business Name<span className="text-red-500 ml-1">*</span></label>
                                            <input
                                                type="text"
                                                name="businessName"
                                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                                                placeholder="e.g., Global Innovations Inc."
                                                value={clientProfileData.businessName}
                                                onChange={handleClientProfileChange}
                                                required
                                            />
                                        </div>
                                        
                                        {/* Industry */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Industry<span className="text-red-500 ml-1">*</span></label>
                                            <select
                                                name="industry"
                                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                                                value={clientProfileData.industry}
                                                onChange={handleClientProfileChange}
                                                required
                                            >
                                                <option value="">Select Industry</option>
                                                {industryOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        {/* Business Type */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Business Type<span className="text-red-500 ml-1">*</span></label>
                                            <select
                                                name="businessType"
                                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                                                value={clientProfileData.businessType}
                                                onChange={handleClientProfileChange}
                                                required
                                            >
                                                <option value="">Select Business Type</option>
                                                {businessTypeOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        {/* Founded Year */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Founded Year</label>
                                            <input
                                                type="number"
                                                name="foundedYear"
                                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                                                placeholder="e.g., 2010"
                                                value={clientProfileData.foundedYear}
                                                onChange={handleClientProfileChange}
                                                min="1900"
                                                max={currentYear}
                                            />
                                        </div>
                                        
                                        {/* Company Size */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Company Size</label>
                                            <select
                                                name="companySize"
                                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                                                value={clientProfileData.companySize}
                                                onChange={handleClientProfileChange}
                                            >
                                                <option value="">Select Company Size</option>
                                                {companySizeOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        {/* Website URL */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Website URL</label>
                                            <input
                                                type="url"
                                                name="websiteUrl"
                                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                                                placeholder="https://www.yourcompany.com"
                                                value={clientProfileData.websiteUrl}
                                                onChange={handleClientProfileChange}
                                            />
                                        </div>
                                        
                                        {/* LinkedIn Page */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">LinkedIn Page URL</label>
                                            <input
                                                type="url"
                                                name="linkedInPage"
                                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                                                placeholder="https://linkedin.com/company/yourcompany"
                                                value={clientProfileData.linkedInPage}
                                                onChange={handleClientProfileChange}
                                            />
                                        </div>
                                        
                                        {/* Business Email */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Business Email<span className="text-red-500 ml-1">*</span></label>
                                            <input
                                                type="email"
                                                name="businessEmail"
                                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                                                placeholder="contact@yourcompany.com"
                                                value={clientProfileData.businessEmail}
                                                onChange={handleClientProfileChange}
                                                required
                                            />
                                        </div>
                                        
                                        {/* Country */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Country<span className="text-red-500 ml-1">*</span></label>
                                            <input
                                                type="text"
                                                name="country"
                                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                                                placeholder="e.g., India"
                                                value={clientProfileData.country}
                                                onChange={handleClientProfileChange}
                                                required
                                            />
                                        </div>
                                        
                                        {/* State/Region */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">State / Region</label>
                                            <input
                                                type="text"
                                                name="stateOrRegion"
                                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                                                placeholder="e.g., Maharashtra"
                                                value={clientProfileData.stateOrRegion}
                                                onChange={handleClientProfileChange}
                                            />
                                        </div>
                                        
                                        {/* City */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                                                placeholder="e.g., Nagpur"
                                                value={clientProfileData.city}
                                                onChange={handleClientProfileChange}
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* About Business - Full width */}
                                    <div className="mt-6">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">About Your Business</label>
                                        <textarea
                                            name="aboutBusiness"
                                            className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md h-32 resize-y"
                                            placeholder="Provide a brief description of your business (max 1000 characters)"
                                            maxLength={1000}
                                            value={clientProfileData.aboutBusiness}
                                            onChange={handleClientProfileChange}
                                        ></textarea>
                                        <p className="text-slate-500 text-sm mt-2 font-medium">
                                            {clientProfileData.aboutBusiness.length} / 1000 characters
                                        </p>
                                    </div>
                                </div>

                                {/* Experience Section */}
                                <div className="mb-8 border-t border-slate-200 pt-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-3a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1zM4 9v2h2V9H4zm8 0v2h2V9h-2z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-purple-700 bg-clip-text text-transparent">Experience</h3>
                                        </div>
                                        <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium">
                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            Add Experience
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Design Experience</label>
                                            <input
                                                type="text"
                                                name="designExperience"
                                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                                                placeholder="Years of experience in design"
                                                value={clientProfileData.designExperience}
                                                onChange={handleClientProfileChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Details</label>
                                            <input
                                                type="text"
                                                name="additionalDetails"
                                                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
                                                placeholder="Additional skills or certifications"
                                                value={clientProfileData.additionalDetails}
                                                onChange={handleClientProfileChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-center gap-4 pt-8 border-t border-slate-200">
                                    <button
                                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl shadow-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
                                        type="button"
                                        onClick={handleSaveProfile}
                                    >
                                        {profileExists ? 'Update Profile' : 'Save Profile'}
                                    </button>
                                    {profileExists && (
                                        <button
                                            className="px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 font-bold text-lg rounded-xl shadow-lg hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-200 transition-all duration-300 transform hover:scale-105"
                                            type="button"
                                            onClick={handleCancelEdit}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        // --- VIEW MODE: Render ClientProfileView component ---
                        <ClientProfileView
                            profileData={clientProfileData}
                            onEditClick={handleEditClick}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;
