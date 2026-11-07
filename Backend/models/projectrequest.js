import mongoose from 'mongoose';

const projectRequestSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  projectType: {
    type: String,
    enum: ['Web', 'App'],
    required: true
  },
  timeline: {
    type: Number, // in weeks
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ProjectRequest', projectRequestSchema);
