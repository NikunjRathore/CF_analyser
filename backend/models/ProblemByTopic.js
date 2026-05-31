import mongoose from 'mongoose';

const ProblemByTopicSchema = new mongoose.Schema({
  division: String,
  topic: String,
  problems: [{
    id: String,
    name: String,
    rating: Number,
    contestId: Number,
    contestName: String
  }]
});

export default mongoose.model('ProblemByTopic', ProblemByTopicSchema);