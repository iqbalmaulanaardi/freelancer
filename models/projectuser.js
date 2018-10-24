'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectUser = sequelize.define('ProjectUser', {
    project_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  ProjectUser.associate = function(models) {
    // associations can be defined here
  };
  return ProjectUser;
};