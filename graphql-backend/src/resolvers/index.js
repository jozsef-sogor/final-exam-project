import userResolvers from './userResolvers.js';
import projectResolvers from './projectResolvers.js';
import milestoneResolvers from './milestoneResolvers.js';
import noteResolvers from './noteResolvers.js';

const resolvers = {
  ...userResolvers,
  ...projectResolvers,
  ...milestoneResolvers,
  ...noteResolvers,
};

export default resolvers;
