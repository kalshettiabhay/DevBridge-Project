import mongoose from 'mongoose';

const DeveloperProfileSchema = new mongoose.Schema({
   userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
        unique: true, 
      },
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  currentRole: String,
  yearsOfExperience: String,
  country: String,
  city: String,
  bio: { type: String, maxlength: 1000 },
  githubUrl: String,
  linkedInUrl: String,
  portfolioUrl: String,
  avatarUrl: String,
  technologyStack: [String],
  famousProjects: [
    {
      title: String,
      description: String
    }
  ],
  teamAchievements: [
    {
      title: String,
      description: String
    }
  ],
  resumeUrl: String, // file path
}, { timestamps: true });

export default mongoose.model('DeveloperProfile', DeveloperProfileSchema);
