const mongoose = require('mongoose');
const leagueSchema = new mongoose.Schema({
  team_name: { type: String, required: true, trim: true },
  position: { type: Number, required: true,   trim: true },
  games_played: { type: Number, required: true,   trim: true },
  wins: { type: Number, required: true,   trim: true },
  draws: { type: Number, trim: true },
  losses: { type: Number, trim: true },
  goal_difference: { type: Number, trim: true },
  points: { type: Number, required: true, trim: true },
});
leagueSchema.index({ team_name: 1, points: 1 , wins:1  });
module.exports = mongoose.model('leagues', leagueSchema);