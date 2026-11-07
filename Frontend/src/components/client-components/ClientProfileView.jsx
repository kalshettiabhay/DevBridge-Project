
import React from 'react';
import { Building, Mail, Globe, Linkedin, MapPin, Calendar, Users, Edit3, Award, Star, Briefcase } from 'lucide-react';

const ClientProfileView = ({ profileData, onEditClick }) => {
    const {
        businessName,
        industry,
        businessType,
        foundedYear,
        companySize,
        websiteUrl,
        linkedInPage,
        businessEmail,
        country,
        stateOrRegion,
        city,
        aboutBusiness,
        logoUrl,
        designExperience,
        additionalDetails,
    } = profileData;

    const location = [city, stateOrRegion, country].filter(Boolean).join(', ');

    const InfoCard = ({ icon: Icon, label, value, link = null, bgColor = "from-blue-50 to-indigo-50" }) => {
        if (!value) return null;
        
        const content = (
            <div className={`relative p-6 bg-gradient-to-br ${bgColor} rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/50 backdrop-blur-sm group`}>
                <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                        <p className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-1">{label}</p>
                        <p className="text-slate-800 font-semibold text-lg leading-tight">{value}</p>
                    </div>
                </div>
                {link && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
            </div>
        );

        return link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="block">
                {content}
            </a>
        ) : content;
    };

    return (
        <>
            {/* Hero Header Section */}
            <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)'
                    }}></div>
                </div>
                
                <div className="relative px-8 py-12">
                    {/* Edit Button */}
                    <div className="absolute top-6 right-6">
                        <button
                            onClick={onEditClick}
                            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 border border-white/20"
                        >
                            <Edit3 className="w-5 h-5" />
                            Edit Profile
                        </button>
                    </div>
                    
                    {/* Profile Content */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 max-w-6xl mx-auto">
                        {/* Logo Section */}
                        <div className="relative">
                            <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl bg-white/10 backdrop-blur-sm">
                                <img
                                    src={logoUrl || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop&crop=center'}
                                    alt="Business Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Status Indicator */}
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                                <Star className="w-5 h-5 text-white fill-current" />
                            </div>
                        </div>
                        
                        {/* Business Info */}
                        <div className="text-center lg:text-left text-white flex-1">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent leading-tight">
                                {businessName || 'Your Business Name'}
                            </h1>
                            
                            {/* Business Details */}
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-blue-100 mb-6">
                                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                    <Building className="w-5 h-5" />
                                    <span className="font-medium">{industry || 'Industry'}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                    <Briefcase className="w-5 h-5" />
                                    <span className="font-medium">{businessType || 'Business Type'}</span>
                                </div>
                                {foundedYear && (
                                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                        <Calendar className="w-5 h-5" />
                                        <span className="font-medium">Founded {foundedYear}</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Location */}
                            {location && (
                                <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-200 mb-4">
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-lg font-medium">{location}</span>
                                </div>
                            )}
                            
                            {/* Company Stats */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-center">
                                {companySize && (
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                                        <div className="text-2xl font-bold text-white">{companySize}</div>
                                        <div className="text-blue-200 text-sm font-medium">Employees</div>
                                    </div>
                                )}
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                                    <div className="text-2xl font-bold text-white">4.9</div>
                                    <div className="text-blue-200 text-sm font-medium">Rating</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                                    <div className="text-2xl font-bold text-white">50+</div>
                                    <div className="text-blue-200 text-sm font-medium">Projects</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* About Section */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About Business */}
                            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg border border-blue-100">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                        <Building className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent">About Our Business</h2>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50 shadow-sm">
                                    <p className="text-slate-700 leading-relaxed text-lg font-medium">
                                        {aboutBusiness || 'We are a forward-thinking company dedicated to delivering exceptional solutions and building lasting partnerships with our clients. Our commitment to innovation and excellence drives everything we do.'}
                                    </p>
                                </div>
                            </div>

                            {/* Experience Section */}
                            {(designExperience || additionalDetails) && (
                                <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-8 shadow-lg border border-indigo-100">
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                            <Award className="w-6 h-6 text-white" />
                                        </div>
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-indigo-700 bg-clip-text text-transparent">Experience & Expertise</h2>
                                    </div>
                                    <div className="space-y-4">
                                        {designExperience && (
                                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-200/50 shadow-sm">
                                                <h3 className="font-bold text-xl text-slate-800 mb-3 flex items-center">
                                                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3"></div>
                                                    Design Experience
                                                </h3>
                                                <p className="text-slate-700 text-lg font-medium">{designExperience}</p>
                                            </div>
                                        )}
                                        {additionalDetails && (
                                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-200/50 shadow-sm">
                                                <h3 className="font-bold text-xl text-slate-800 mb-3 flex items-center">
                                                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                                                    Additional Details
                                                </h3>
                                                <p className="text-slate-700 text-lg font-medium">{additionalDetails}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contact Information Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-lg border border-slate-200">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    Contact Information
                                </h2>
                                <div className="space-y-4">
                                    <InfoCard
                                        icon={Mail}
                                        label="Business Email"
                                        value={businessEmail}
                                        link={`mailto:${businessEmail}`}
                                        bgColor="from-blue-50 to-indigo-50"
                                    />
                                    <InfoCard
                                        icon={Globe}
                                        label="Website"
                                        value={websiteUrl ? new URL(websiteUrl).hostname : null}
                                        link={websiteUrl}
                                        bgColor="from-green-50 to-emerald-50"
                                    />
                                    <InfoCard
                                        icon={Linkedin}
                                        label="LinkedIn"
                                        value="Company Page"
                                        link={linkedInPage}
                                        bgColor="from-blue-50 to-cyan-50"
                                    />
                                    <InfoCard
                                        icon={MapPin}
                                        label="Location"
                                        value={location}
                                        bgColor="from-purple-50 to-pink-50"
                                    />
                                    {companySize && (
                                        <InfoCard
                                            icon={Users}
                                            label="Company Size"
                                            value={`${companySize} employees`}
                                            bgColor="from-orange-50 to-red-50"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
                                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-all duration-300 font-medium border border-white/20">
                                        Send Message
                                    </button>
                                    <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-lg hover:bg-white/30 transition-all duration-300 font-medium border border-white/20">
                                        Schedule Meeting
                                    </button>
                                    <button className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-300 font-bold shadow-lg">
                                        Start Project
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientProfileView;
