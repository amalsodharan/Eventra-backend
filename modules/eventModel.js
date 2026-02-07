export default (sequelize, Sequelize) => {
  return sequelize.define('Event', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['admin', 'user']],
      },
    },
    event_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    desc: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    landmark_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    start_date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    end_date: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '0000-00-00',
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
