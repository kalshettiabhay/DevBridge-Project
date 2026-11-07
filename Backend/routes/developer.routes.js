import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();
import DeveloperProfile from "../models/developer.js"
import ProjectRequest from "../models/projectrequest.js"

router.post('/profile', authMiddleware(['Developer']), async (req, res) => {

  
    const {

      fullName,
      email,
      currentRole,
      yearsOfExperience,
      hourlyRate,
      availability,
      country,
      city,
      bio,
      githubUrl,
      linkedInUrl,
      portfolioUrl,
      avatarUrl,
      technologyStack,
      famousProjects,
      teamAchievements
    } = req.body;

    try{
let developerProfile = await DeveloperProfile.findOne({ userId: req.user.id});

const profile = {
  userId: req.user.id,
  fullName,
  email,
  currentRole,
  yearsOfExperience,
  hourlyRate,
  availability,
  country,
  city,
  bio,
  githubUrl,
  linkedInUrl,
  portfolioUrl,
  avatarUrl,
  technologyStack: technologyStack,
  famousProjects: famousProjects,
  teamAchievements: teamAchievements,
  resumeUrl: req.file ? `/uploads/${req.file.filename}` : null
};

if(developerProfile){
  developerProfile= await DeveloperProfile.findOneAndUpdate(
    
                {  userId: req.user.id }, // Find by userId
                { $set: profile },
                { new: true, upsert: true, runValidators: true } // Return new doc, create if not found, run schema validators
  )
return res.json(developerProfile);
}

developerProfile= new DeveloperProfile(profile);
await developerProfile.save();
    res.status(201).json({ message: 'Profile created successfully', profile });


    }catch(error){
   console.error('Error saving profile:', error);
    res.status(500).json({ error: 'Something went wrong' });
    }

 


 
});
router.get("/profile",authMiddleware(['Developer']),async (req,res)=>{
    const result= await DeveloperProfile.findOne({
userId: req.user.id,
    })
    res.json(result);
})

// GET /api/projects
router.get('/getprojects',authMiddleware(['Developer']), async (req, res) => {
  try {
    const projects = await ProjectRequest.find();
    
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

export default router;