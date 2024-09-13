import express from "express";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
import { Op, Sequelize } from "sequelize";
import {
  User,
  Character,
  Campaign,
  SessionNote,
  DMNote
} from "./src/model.js";

const app = express();
const port = 8000;

app.use(morgan("dev"));
app.use(express.urlencoded({ extend: false }));
app.use(express.json());
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);

ViteExpress.config({ printViteDevServerHost: true });

function loginRequired(req, res, next) {
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
}

//*********************************START API Endpoints*********************************//

//__________login, logout, register, and user info__________//

// login
app.post("/api/auth", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email: email },
  });
  if (user && user.password === password) {
    req.session.userId = user.userId;
    console.log(req.session);

    res.json({ success: true, userId: req.session.userId });
  } else {
    res.json({ success: false });
  }
});

// session user
app.get("/api/auth", async (req, res) => {
  const { userId } = req.session;
  const user = await User.findByPk(userId);
  console.log(user);
  res.json({ user: user });
});

// view user data
app.get("/api/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId);
  console.log(user);
  res.json({ user: user });
});

// logout
app.post("/api/logout", loginRequired, (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// create new user
app.post("/api/user", async (req, res) => {
  const { username, email, password } = req.body;

  const userEmail = await User.findOne({
    where: { email: email },
  });

  const userUsername = await User.findOne({
    where: { username: username },
  });

  if (!userEmail && !userUsername) {
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });
    res.json(user);
  } else if (userEmail) {
    res.json({ error: "Email already in use." });
  } else {
    res.json({ error: "Username already in use." });
  }
});

// edit user bio
app.put("/api/user/editBio", async (req, res) => {
  const { bio } = req.body;
  const { userId } = req.session;
  const user = await User.findByPk(userId);
  user.bio = bio || user.bio;
  await user.save();
  res.json({ success: true });
});

// change password
app.put("/api/user/editPassword", async (req, res) => {
  const { password, password2, currentPassword } = req.body;
  const { userId } = req.session;
  const user = await User.findByPk(userId);
  if (currentPassword === user.password) {
    if (currentPassword !== password) {
      if (password === password2) {
        user.password = password || user.password;
        await user.save();
        console.log("success");
        res.json({ success: true });
      } else {
        res.json({
          success: false,
          error: "New password doesn't match in both fields",
        });
      }
    } else {
      res.json({
        success: false,
        error:
          "New password is the same as your current password. Please pick a different password.",
      });
    }
  } else {
    res.json({
      success: false,
      error:
        "Password entered doesn't match current password, check your spelling and try again. If you continue to have problems, please contact an administator to reset your password.",
    });
  }
});

//__________ Party / Characters __________//

// view party
app.get("/api/party", loginRequired, async (req, res) => {
  const allParty = await Character.findAll({ order: [["pcName"]] });
  res.json(allParty);
});

// view character in party
app.get("/api/party/:pcId", loginRequired, async (req, res) => {
  const { pcId } = req.params;
  const character = await Character.findByPk(pcId);
  res.json(character);
});

// create new character
app.post("/api/party", loginRequired, async (req, res) => {
  const {
    pcId,
    pcName,
    pcRace,
    pcClass,
    pcSubclass,
    pcLevel,
    pcArmor,
    pcHealth,
    pcMovement,
    pcVision,
    pcResistances,
    pcImmunities,
    pcBackstory,
    pcAllies,
    pcEnemies,
    pcGoals,
    pcExtras,
    pcBGName,
    pcBGDesc,
    pcTools,
    pcLanguages,
    pcPassPer,
    pcPassInv,
    pcPassIns,
    pcImg,
  } = req.body;

  const newPC = await Character.create({
    // if no value is provided in req.body, use default values
    pcId: pcId,
    
    
    
    pcName: pcName || "",
    pcRace: pcRace || "",
    pcClass: pcClass || "",
    pcSubclass: pcSubclass || "",
    pcLevel: +pcLevel || 1,
    pcArmor: pcArmor || 0,
    pcHealth: pcHealth || 0,
    pcMovement: pcMovement || "",
    pcVision: pcVision || "",
    pcResistances: pcResistances || "",
    pcImmunities: pcImmunities || "",
    pcBackstory: pcBackstory || "",
    pcAllies: pcAllies || "",
    pcEnemies: pcEnemies || "",
    pcGoals: pcGoals || "",
    pcExtras: pcExtras || "",
    pcBGName: pcBGName || "",
    pcBGDesc: pcBGDesc || "",
    pcTools: pcTools || "",
    pcLanguages: pcLanguages || "",
    pcPassPer: pcPassPer || 0,
    pcPassInv: pcPassInv || 0,
    pcPassIns: pcPassIns || 0,
    pcImg: pcImg || "https://rpgcampaigntracker.s3.amazonaws.com/player_unknown.png",
  });
  res.json(newPC);
});

// edit character
app.put("/api/party/:pcId", loginRequired, async (req, res) => {
  const { pcId } = req.params;
  const {
    pcImg,
    pcName,
    pcRace,
    pcClass,
    pcLevel,
    pcBackstory,
    pcAllies,
    pcGoals,
    pcExtras,
  } = req.body;

  const editPC = await Character.findOne({ where: { pcId: +pcId } });
  if (editPC.pcId !== +pcId) {
    res.status(404).json({ error: `Item with ID ${pcId} not found!` });
  } else {
    // Only update the values that are provided in req.body
      (editPC.pcImg = pcImg || editPC.pcImg),
      (editPC.pcName = pcName || editPC.pcName),
      (editPC.pcRace = pcRace || editPC.pcRace),
      (editPC.pcClass = pcClass || editPC.pcClass),
      (editPC.pcLevel = +pcLevel || editPC.pcLevel),
      (editPC.pcBackstory = pcBackstory || editPC.pcBackstory),
      (editPC.pcAllies = pcAllies || editPC.pcAllies),
      (editPC.pcGoals = pcGoals || editPC.pcGoals),
      (editPC.pcExtras = pcExtras || editPC.pcExtras),
      await editPC.save();
    res.json(editPC);
  }
});

// delete character
app.delete("/api/party/:pcId/delete", loginRequired, async (req, res) => {
  const { pcId } = req.params;

  const deletePC = await Character.findOne({ where: { pcId: +pcId } });
  if (deletePC.pcId !== +pcId) {
    res.status(404).json({ error: `Item with ID ${pcId} not found!` });
  } else {
    await deletePC.destroy();
    res.json(deletePC);
  }
});

// TODO assign character to a user

//__________ Session Notes __________//

//find all session notes
app.get('/api/sessionNotes', loginRequired, async (req, res) => {
    const allNotes = await SessionNote.findAll({order: [['sesNumber', 'DESC']]})
    res.json(allNotes);
});

// find session notes by id
app.get('/api/sessionNotes/:sesId', loginRequired, async (req, res) => {
    const { sesId } = req.params;
    const findSession = await SessionNote.findByPk(sesId);
    res.json(findSession);
  });

// TODO find session notes by date

// create session note
app.post('/api/sessionNotes', loginRequired, async (req, res) => {
    const { sesId, sesNumber, sesDate, sesPartyLvl, sesNotes } = req.body;
    
    const newSes = await SessionNote.create({
        // if no value is provided in req.body, use default values
        sesId: sesId,
        sesNumber: sesNumber || '',
        sesDate: sesDate,
        sesPartyLvl: +(sesPartyLvl) || 0,
        sesNotes: sesNotes || '',

    });
    res.json(newSes);
});

// edit session notes
app.put('/api/sessionNotes/:sesId', loginRequired, async (req, res) => {
    const { sesId } = req.params;
    const { sesNumber, sesDate, sesPartyLvl, sesNotes } = req.body;
 
    const editSes = await SessionNote.findOne({ where: { sesId: +sesId}});
    if (editSes.sesId !== +sesId) {
        res.status(404).json({ error: `Session Notes with ID ${sesId} not found!`});
    } else {

            // Only update the values that are provided in req.body
            editSes.sesNumber = sesNumber || editSes.sesNumber,
            editSes.sesDate = sesDate || editSes.sesDate,
            editSes.sesPartyLvl = sesPartyLvl || editSes.sesPartyLvl,
            editSes.sesNotes = sesNotes || editSes.sesNotes,
            
            await editSes.save()
        res.json(editSes);
    }
});

// delete session notes
app.delete('/api/sessionNotes/:sesId/delete', loginRequired, async (req, res) => {
    const { sesId } = req.params;
    
    const deleteSes = await SessionNote.findOne({ where: { sesId: +sesId}});
    if (deleteSes.sesId !== +sesId) {
        res.status(404).json({ error: `Session Notes with ID ${sesId} not found!`});
    } else {
        await deleteSes.destroy()
        res.json(deleteSes);
    }
});

//__________ DM Notes __________//

// display all DM notes
app.get('/api/dmNotes', loginRequired, async (req, res) => {
    const allNotes = await DMNote.findAll({order: [['dmNoteId', 'DESC']]})
    res.json(allNotes);
});

// create new DM note
app.post('/api/dmNotes', loginRequired, async (req, res) => {
    const { dmNoteId, dmNoteIdeas } = req.body;
    
    const newDMNote = await DMNote.create({
        // if no value is provided in req.body, use default values
        dmNoteId: dmNoteId,
        dmNoteIdeas: dmNoteIdeas || '',
    });
    res.json(newDMNote);
});

// edit DM note
app.put('/api/dmNotes/:dmNoteId', loginRequired, async (req, res) => {
    const { dmNoteId } = req.params;
    const { dmNoteIdeas } = req.body;
 
    const editDMNote = await DMNote.findOne({ where: { dmNoteId: +dmNoteId}});
    if (editDMNote.dmNoteId !== +dmNoteId) {
        res.status(404).json({ error: `Session Notes with ID ${dmNoteId} not found!`});
    } else {
            // Only update the values that are provided in req.body
            editDMNote.dmNoteIdeas = dmNoteIdeas || editDMNote.dmNoteIdeas,

            await editDMNote.save()
        res.json(editDMNote);
    }
});

// delete DM note
app.delete('/api/dmNotes/:dmNoteId/delete', loginRequired, async (req, res) => {
    const { dmNoteId } = req.params;
    
    const deleteDMNote = await DMNote.findOne({ where: { dmNoteId: +dmNoteId}});
    if (deleteDMNote.dmNoteId !== +dmNoteId) {
        res.status(404).json({ error: `DM Notes with ID ${dmNoteId} not found!`});
    } else {
        await deleteDMNote.destroy()
        res.json(deleteDMNote);
    }
});

//*********************************END API Endpoints*********************************//

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
