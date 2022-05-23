const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return mission.init(sequelize, DataTypes);
}

class mission extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    additional_information: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "(DC2Type:array)"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    retrocession: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    skills: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "(DC2Type:array)"
    },
    working_days: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "(DC2Type:array)"
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    need_vehicle: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    establishment_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    necessary_equipment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    archived_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    source_link: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mission',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "IDX_9067F23C61220EA6",
        using: "BTREE",
        fields: [
          { name: "creator_id" },
        ]
      },
    ]
  });
  }
}
