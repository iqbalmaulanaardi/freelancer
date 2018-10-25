'use strict';
module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        budget: DataTypes.INTEGER,
        deadline: DataTypes.DATE,
        owner_id: DataTypes.INTEGER
    }, {
        hooks: {
            beforeDestroy: function(Project, options) {
                sequelize.models.ProjectUser.destroy({ where: { project_id: Project.id } })
                    .then(function() {})
                    .catch(function(err) {
                        return new err
                    });
            }
        }
    });
    Project.associate = function(models) {
        // associations can be defined here
        Project.belongsTo(models.Owner, { foreignKey: 'owner_id' });
        Project.belongsToMany(models.User, { through: models.ProjectUser, foreignKey: 'project_id' });
    };
    Project.prototype.isDate = function() {
        let kamus = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        let str = `${kamus[this.deadline.getDay()]}, ${this.deadline.getDate()}-${this.deadline.getMonth()}-${this.deadline.getFullYear()}`
        return str
    }
    Project.getHighBudget = function() {
        return new Promise(function(resolve, reject) {
            Project.findAll({
                    where: {
                        budget: {
                            [sequelize.Op.gt]: 25000
                        }
                    }
                })
                .then(function(output) {
                    resolve(output)
                })
        })
    }
    return Project;
};