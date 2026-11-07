import express from 'express';
import Client from "../models/client.js"
import authmiddleware from "../middlewares/authMiddleware.js";
import ProjectRequest from "../models/projectrequest.js";
const router = express.Router();
router.post('/client-profiles',authmiddleware(['User']), async (req, res) => {
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
    } = req.body;

    try {
        let clientProfile = await Client.findOne({ userId: req.user.id});

        const profileFields = {
            userId: req.user.id,
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
        };

        if (clientProfile) {
            // Update existing profile
            clientProfile = await Client.findOneAndUpdate(
                {  userId: req.user.id }, // Find by email
                { $set: profileFields },
                { new: true, upsert: true, runValidators: true } // Return new doc, create if not found, run schema validators
            );
            return res.json(clientProfile);
        }

        // Create new profile
        clientProfile = new Client(profileFields);
        await clientProfile.save();
        res.status(201).json(clientProfile);

    } catch (err) {
        console.error(err.message);
        // Check for specific error types, e.g., duplicate email
        if (err.code === 11000 && err.keyPattern && err.keyPattern.businessEmail) {
            return res.status(400).json({ msg: 'A profile with this email already exists.' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   GET api/client-profiles/:email
// @desc    Get client profile by email
// @access  Public (for simplicity, add authentication in a real app)
router.get('/client-profiles',authmiddleware(['User']), async (req, res) => {
    console.log("sd dj");
    console.log(req.user.id);
    
    try {
        const clientProfile = await Client.findOne({ userId:req.user.id });

        if (!clientProfile) {
            return res.status(404).json({ msg: 'Client profile not found' });
        }

        res.json(clientProfile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/client/project-request',authmiddleware(['User']), async (req,res)=>{
try {
    const { projectType, timeline, description } = req.body;
    const newRequest = new ProjectRequest({
      clientId: req.user.id,
      projectType,
      timeline,
      description,
    });
    await newRequest.save();
    res.status(201).json({ message: "Request created successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to create request" });
  }
    
})
router.get('/projects/my-projects',authmiddleware(['User']), async (req,res)=>{
    console.log(req.user);
    
 try {
    const projects= await ProjectRequest.find({
        clientId: req.user.id
    })
    res.status(200).json(projects);
 } catch (error) {
    res.status(500).json({ error: "Failed to fetch request" })
 }
})
export default router;