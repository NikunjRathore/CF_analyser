import Contest from '../models/Contest.js';
import ProblemByRating from '../models/ProblemByRating.js';
import ProblemByTopic from '../models/ProblemByTopic.js';

const aggregateFromContests = async (division) => {
  const contests = await Contest.find({ division });
  const problemsByRating = {};
  const problemsByTopic = {};

  contests.forEach((contest) => {
    contest.problems.forEach((problem) => {
      if (problem.rating) {
        const rating = problem.rating.toString();
        if (!problemsByRating[rating]) problemsByRating[rating] = [];
        problemsByRating[rating].push({
          id: problem.id,
          name: problem.name,
          contestId: contest.id,
          contestName: contest.name,
          tags: problem.tags || [],
        });
      }

      problem.tags?.forEach((tag) => {
        if (!problemsByTopic[tag]) problemsByTopic[tag] = [];
        problemsByTopic[tag].push({
          id: problem.id,
          name: problem.name,
          rating: problem.rating,
          contestId: contest.id,
          contestName: contest.name,
        });
      });
    });
  });

  return {
    rating: Object.entries(problemsByRating).map(([rating, problems]) => ({
      division,
      rating: Number(rating),
      problems,
    })),
    topic: Object.entries(problemsByTopic).map(([topic, problems]) => ({
      division,
      topic,
      problems,
    })),
  };
};

export const getProblemsByRating = async (req, res) => {
  try {
    const { division } = req.params;
    let problems = await ProblemByRating.find({ division });

    if (problems.length === 0) {
      const aggregated = await aggregateFromContests(division);
      problems = aggregated.rating;
    }

    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch problems by rating' });
  }
};

export const getProblemsByTopic = async (req, res) => {
  try {
    const { division } = req.params;
    let problems = await ProblemByTopic.find({ division });

    if (problems.length === 0) {
      const aggregated = await aggregateFromContests(division);
      problems = aggregated.topic;
    }

    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch problems by topic' });
  }
};
