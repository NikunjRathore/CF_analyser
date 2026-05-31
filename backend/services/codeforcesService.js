import Contest from '../models/Contest.js';
import ProblemByRating from '../models/ProblemByRating.js';
import ProblemByTopic from '../models/ProblemByTopic.js';

const DIVISIONS = ['div1', 'div2', 'div3', 'div4'];
const CONTESTS_PER_DIVISION = 50;
const API_DELAY_MS = 350;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDivisionsForContest = (contestName) => {
  const name = contestName.toLowerCase();
  const divisions = [];

  if (name.includes('div. 4')) divisions.push('div4');
  if (name.includes('div. 3')) divisions.push('div3');
  if (name.includes('div. 2') || name.includes('rated for div. 2')) {
    divisions.push('div2');
  }
  if (name.includes('div. 1')) divisions.push('div1');

  return [...new Set(divisions)];
};

const fetchContestProblems = async (contestId) => {
  await delay(API_DELAY_MS);

  const response = await fetch(
    `https://codeforces.com/api/contest.standings?contestId=${contestId}`
  );
  const data = await response.json();

  if (data.status !== 'OK' || !data.result?.problems) {
    console.warn(`No problems for contest ${contestId}:`, data.comment || data.status);
    return [];
  }

  return data.result.problems;
};

const storeProblemsByRating = async (division, contest, problems) => {
  const problemsByRating = {};

  problems.forEach((problem) => {
    if (!problem.rating) return;

    const rating = Number(problem.rating);
    if (!problemsByRating[rating]) problemsByRating[rating] = [];

    problemsByRating[rating].push({
      id: `${contest.id}-${problem.index}`,
      name: problem.name,
      contestId: contest.id,
      contestName: contest.name,
      tags: problem.tags || [],
    });
  });

  for (const [rating, probs] of Object.entries(problemsByRating)) {
    await ProblemByRating.findOneAndUpdate(
      { division, rating: Number(rating) },
      { $push: { problems: { $each: probs } } },
      { upsert: true }
    );
  }
};

const storeProblemsByTopic = async (division, contest, problems) => {
  const problemsByTopic = {};

  problems.forEach((problem) => {
    if (!problem.tags?.length) return;

    problem.tags.forEach((tag) => {
      if (!problemsByTopic[tag]) problemsByTopic[tag] = [];
      problemsByTopic[tag].push({
        id: `${contest.id}-${problem.index}`,
        name: problem.name,
        rating: problem.rating,
        contestId: contest.id,
        contestName: contest.name,
      });
    });
  });

  for (const [topic, probs] of Object.entries(problemsByTopic)) {
    await ProblemByTopic.findOneAndUpdate(
      { division, topic },
      { $push: { problems: { $each: probs } } },
      { upsert: true }
    );
  }
};

export const updateContestData = async () => {
  try {
    console.log('Starting contest data update...');

    await Contest.deleteMany({});
    await ProblemByRating.deleteMany({});
    await ProblemByTopic.deleteMany({});

    const response = await fetch('https://codeforces.com/api/contest.list');
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error('Failed to fetch contest list from Codeforces');
    }

    const categorizedContests = {
      div1: [],
      div2: [],
      div3: [],
      div4: [],
    };

    data.result
      .filter((contest) => contest.phase === 'FINISHED')
      .forEach((contest) => {
        const divisions = getDivisionsForContest(contest.name);
        divisions.forEach((division) => {
          categorizedContests[division].push(contest);
        });
      });

    DIVISIONS.forEach((division) => {
      const uniqueById = new Map();
      categorizedContests[division].forEach((contest) => {
        uniqueById.set(contest.id, contest);
      });

      categorizedContests[division] = [...uniqueById.values()]
        .sort((a, b) => b.startTimeSeconds - a.startTimeSeconds)
        .slice(0, CONTESTS_PER_DIVISION);

      console.log(
        `Prepared ${categorizedContests[division].length} contests for ${division}`
      );
    });

    const problemCache = new Map();

    for (const division of DIVISIONS) {
      console.log(`Processing ${division} contests...`);

      for (const contest of categorizedContests[division]) {
        if (!problemCache.has(contest.id)) {
          try {
            const problems = await fetchContestProblems(contest.id);
            problemCache.set(contest.id, problems);
          } catch (error) {
            console.error(
              `Failed to fetch problems for contest ${contest.id}:`,
              error.message
            );
            problemCache.set(contest.id, []);
          }
        }

        const problems = problemCache.get(contest.id) ?? [];

        await Contest.create({
          id: contest.id,
          name: contest.name,
          division,
          startTimeSeconds: contest.startTimeSeconds,
          problems: problems.map((problem) => ({
            id: `${contest.id}-${problem.index}`,
            name: problem.name,
            rating: problem.rating,
            tags: problem.tags || [],
          })),
        });

        if (problems.length > 0) {
          await storeProblemsByRating(division, contest, problems);
          await storeProblemsByTopic(division, contest, problems);
        }
      }
    }

    console.log('Contest data update completed successfully');
    return true;
  } catch (error) {
    console.error('Error updating contest data:', error);
    return false;
  }
};

export const seedContestDataIfEmpty = async () => {
  const count = await Contest.countDocuments();
  const hasProblems = await Contest.exists({ 'problems.0': { $exists: true } });

  if (count > 0 && hasProblems) {
    console.log(`Contest database has ${count} records with problems, skipping seed.`);
    return;
  }

  if (count > 0 && !hasProblems) {
    console.log('Contest records found without problems. Re-syncing from Codeforces...');
  } else {
    console.log('Contest database is empty. Starting initial seed...');
  }

  updateContestData().catch((error) => {
    console.error('Contest seed failed:', error);
  });
};
