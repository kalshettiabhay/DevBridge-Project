// models/ClientProfile.js
import mongoose from "mongoose";

const clientProfileSchema = new mongoose.Schema({
 userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true, 
    },
  businessName: {
        type: String,
        required: true,
        trim: true,
    },
    industry: {
        type: String,
        enum: ["Healthcare", "Education", "Retail", "Finance", "Real Estate",
            "Technology", "Logistics", "Hospitality", "Entertainment",
            "Manufacturing", "Other"],
        required: true,
    },
    businessType: {
        type: String,
        enum: ["Startup", "Small Business", "Corporation", "NGO", "Freelancer", "Other"],
        required: true,
    },
    foundedYear: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear(),
    },
    companySize: {
        type: String,
        enum: ["1-10", "11-50", "51-200", "201-500", "500+"],
    },
    websiteUrl: {
        type: String,
        trim: true,
        // Optional: Add regex validation for URL format
    },
    linkedInPage: {
        type: String,
        trim: true,
        // Optional: Add regex validation for URL format
    },
    businessEmail: {
        type: String,
        required: true,
        unique: true, // Assuming email should be unique per client
        trim: true,
        lowercase: true,
        // Optional: Add regex validation for email format
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    stateOrRegion: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    aboutBusiness: {
        type: String,
        maxLength: 1000,
        trim: true,
    },
    logoUrl: {
        type: String,
        trim: true,
        // Optional: Add regex validation for URL format
    },
    
    designExperience: { type: String, trim: true },
 additionalDetails: { type: String, trim: true },
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

export default mongoose.model("Client", clientProfileSchema);