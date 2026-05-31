import mongoose from 'mongoose';

const ContestSchema = new mongoose.Schema({
  id: Number,
  name: String,
  division: String,
  startTimeSeconds: Number,
  problems: [{
    id: String,
    name: String,
    rating: Number,
    tags: [String]
  }]
});

const Contest = mongoose.model('Contest', ContestSchema);
export default Contest