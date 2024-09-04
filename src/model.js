import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';
import { type } from 'os';
import { timeStamp } from 'console';

export const db = await connectToDB('postgres://scottjohnstone:admin@localhost:5432/rpg_campaign_tracker');

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Character extends Model {
  [util.inspect.custom](){
    return this.toJSON()
  }
}

export class SessionNote extends Model {
  [util.inspect.custom](){
    return this.toJSON()
  }
}

export class DMNote extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

export class Campaign extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userRole: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userImg: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    modelName: 'user',
    sequelize: db,
  },
);


Character.init(
{
    pcId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pcName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pcRace: {
        type: DataTypes.STRING,
    },
    pcClass: {
        type: DataTypes.STRING,
    },
    pcSubclass: {
        type: DataTypes.STRING,
    },
    pcLevel: {
        type: DataTypes.INTEGER,
    },  
    pcImg: {
        type: DataTypes.TEXT,
    }, 
    pcBackstory: {
        type: DataTypes.TEXT, 
    },
    pcAllies: {
        type: DataTypes.TEXT,
    },
    pcGoals: {
        type: DataTypes.TEXT,
    },
    pcExtras: {
        type: DataTypes.TEXT,
    }
},
{
  modelName: 'character',
  sequelize: db
}
)

SessionNote.init(
  {
    sesId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    sesNumber: {
      type: DataTypes.INTEGER,
    },
    sesDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    sesPartyLvl: {
        type: DataTypes.INTEGER,
    },
    sesNotes: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    },
  {
    modelName: 'session',
    sequelize: db,
    timestamps: true,
    updatedAt: true
  }
)

DMNote.init(
  {
    dmNoteId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    dmNoteIdeas: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    },
  {
    modelName: 'dmnote',
    sequelize: db,
    timestamps: true,
    updatedAt: true
  }
)

Campaign.init(
  {
    campaignId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    campaignName: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    modelName: 'campaign',
    sequelize: db,
  }
  )

Campaign.hasMany(SessionNote, { foreignKey: 'campaignId'})
SessionNote.belongsTo(Campaign, { foreignKey: 'campaignId' })

Campaign.hasMany(Character, { foreignKey: 'campaignId'})
Character.belongsTo(Campaign, { foreignKey: 'campaignId'})

Campaign.hasMany(User, { foreignKey: 'campaignId' })
User.belongsTo(Campaign, { foreignKey: 'campaignId' })

Campaign.hasMany(DMNote, { foreignKey: 'campaignId' })
DMNote.belongsTo(Campaign, { foreignKey: 'campaignId' })

User.hasMany(Character, { foreignKey: 'userId'})
Character.belongsTo(User, { foreignKey: 'userId'})