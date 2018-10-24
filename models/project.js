'use strict';
module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        budget: DataTypes.INTEGER,
        deadline: DataTypes.DATE,
        owner_id: DataTypes.INTEGER
    }, {});
    Project.associate = function(models) {
        // associations can be defined here
        Project.belongsTo(models.Owner, { foreignKey: 'project_id' });
        Project.belongsToMany(models.User, { through: models.ProjectUser, foreignKey: 'project_id' });
    };
    return Project;
};