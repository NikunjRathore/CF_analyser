import Contest from '../models/Contest.js';
import ProblemByRating from '../models/ProblemByRating.js';
import ProblemByTopic from '../models/ProblemByTopic.js';

const aggregateProblemsByRating = (contests) => {
  const map = {};

  contests.forEach((contest) => {
    contest.problems.forEach((problem) => {
      if (!problem.rating) return;

      const rating = problem.rating.toString();
      if (!map[rating]) map[rating] = [];

      map[rating].push({
        id: problem.id,
        name: problem.name,
        rating: problem.rating,
        contestId: contest.id,
        contestName: contest.name,
        tags: problem.tags || [],
      });
    });
  });

  return map;
};

const aggregateProblemsByTopic = (contests) => {
  const map = {};

  contests.forEach((contest) => {
    contest.problems.forEach((problem) => {
      if (!problem.tags?.length) return;

      problem.tags.forEach((tag) => {
        if (!map[tag]) map[tag] = [];

        map[tag].push({
          id: problem.id,
          name: problem.name,
          rating: problem.rating,
          contestId: contest.id,
          contestName: contest.name,
        });
      });
    });
  });

  return map;
};

export const getContestsByDivision = async (req, res) => {
  try {
    const contests = await Contest.find({ division: req.params.division })
      .sort({ startTimeSeconds: -1 })
      .limit(50);

    res.json(contests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contests' });
  }
};

export const getDivisionAnalytics = async (req, res) => {
  try {
    const { division } = req.params;

    const contests = await Contest.find({ division })
      .sort({ startTimeSeconds: -1 })
      .limit(50);

    const ratingDocs = await ProblemByRating.find({ division });
    const topicDocs = await ProblemByTopic.find({ division });

    let problemsByRating = {};
    let problemsByTopic = {};

    if (ratingDocs.length > 0) {
      ratingDocs.forEach((doc) => {
        problemsByRating[doc.rating.toString()] = doc.problems;
      });
    } else {
      problemsByRating = aggregateProblemsByRating(contests);
    }

    if (topicDocs.length > 0) {
      topicDocs.forEach((doc) => {
        problemsByTopic[doc.topic] = doc.problems;
      });
    } else {
      problemsByTopic = aggregateProblemsByTopic(contests);
    }

    res.json({
      contests,
      problemsByRating,
      problemsByTopic,
    });
  } catch (error) {
    console.error('Division analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch division analytics' });
  }
};

export const syncContests = async (req, res) => {
  try {
    res.status(202).json({ message: 'Contest sync started' });
    const { updateContestData } = await import('../services/codeforcesService.js');
    updateContestData();
  } catch (error) {
    res.status(500).json({ error: 'Failed to start contest sync' });
  }
};
