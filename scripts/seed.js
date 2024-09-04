import {
  User,
  Character,
  SessionNote,
  DMNote,
  Campaign,
  db,
} from "../src/model.js";
import userInfo from ".data/users.json" assert { type: "json" };
import partyInfo from ".data/party.json" assert { type: "json" };
import initialSessionNotes from ".data/sessionNotes.json" assert { type: "json" };
import dmNotes from ".data/dmNotes.json" assert { type: "json" };
import campaignInfo from ".data/campaignInfo.json" assert { type: "json" };

console.log("Synching database...");
await db.sync({ force: true });

console.log("Seeding database...");

// add user profiles to db
const usersInDB = await Promise.all(
  userInfo.map((user) => {
    const { username, email, password, userRole, userImg } = user;
    const newUser = User.create({
      username: username,
      email: email,
      password: password,
      userRole: userRole,
      userImg: userImg,
    });
    return newUser;
  })
);

//  add player characters to db
const charactersInDB = await Promise.all(
    partyInfo.map((character) => {
    const { pcName, pcRace, pcClass, pcSubclass, pcLevel, pcImg, pcBackstory, pcAllies, pcGoals, pcExtras } = character;
    const newDMNote = Character.create({
        pcName: pcName,
        pcRace: pcRace,
        pcClass: pcClass,
        pcSubclass: pcSubclass,
        pcLevel: pcLevel,
        pcImg: pcImg,
        pcBackstory: pcBackstory,
        pcAllies: pcAllies,
        pcGoals: pcGoals,
        pcExtras: pcExtras
    });
    return newDMNote;
  })
);

// add session notes to db
const sessionNotesInDB = await Promise.all(
    initialSessionNotes.map((sesNote) => {
    const { sesNumber, sesDate, sesPartyLvl, sesNotes } = sesNote;
    const newDMNote = SessionNote.create({
        sesNumber: sesNumber,
        sesDate: sesDate,
        sesPartyLvl: sesPartyLvl,
        sesNotes: sesNotes,
    });
    return newDMNote;
  })
);

//add dm notes to db
const dmNotesInDB = await Promise.all(
    dmNotes.map((dmNote) => {
    const { dmNoteIdeas } = dmNote;
    const newDMNote = DMNote.create({
      dmNoteIdeas: dmNoteIdeas,
    });
    return newDMNote;
  })
);

// add campaign
const campaignInDB = await Promise.all(
    campaignInfo.map((campaign) => {
    const { campaignName } = campaign;
    const newCampaign = Campaign.create({
        campaignName: campaignName,
    });
    return newCampaign;
  })
);

await db.close(console.log("Finished seeding database!"));
