const People = require("../models/people");
const people = new People();

// This is the bot skill to decide who is the early bird
module.exports = controller => {
  controller.hears(
    ["^hi$", "^hello$", "^howdy$"],
    "direct_mention,direct_message",
    (bot, message) => {
      bot.api.users.info({ user: message.user }, (error, res) => {
        if (!error) {
          bot.reply(
            message,
            `Hello @${
              res.user.profile.display_name
            } I will be soon incharge of contest early bird :hatching_chick: :hatched_chick:`
          );
          people.upsert(res.user.id, res.user.profile.display_name);
        }
      });
    }
  );
};
