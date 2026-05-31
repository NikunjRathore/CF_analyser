import mongoose from 'mongoose';

const ProblemByRatingSchema = new mongoose.Schema({
  division: String,
  rating: Number,
  problems: [{
    id: String,
    name: String,
    contestId: Number,
    contestName: String,
    tags: [String]
  }]
});

export default mongoose.model('ProblemByRating', ProblemByRatingSchema);