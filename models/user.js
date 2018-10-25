'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        password: DataTypes.STRING,
        age: DataTypes.INTEGER,
        gender: DataTypes.STRING,
        rating: DataTypes.INTEGER,
        wallet: DataTypes.INTEGER,
        salt: DataTypes.TEXT
    }, {
        hooks: {
            beforeDestroy: function(User, options) {
                sequelize.models.ProjectUser.destroy({ where: { user_id: User.id } })
                    .then(function() {

                    })
                    .catch(function(err) {
                        throw err;
                    })
            }
        }
    });
    User.associate = function(models) {
        // associations can be defined here
        User.belongsToMany(models.Project, { through: models.ProjectUser, foreignKey: 'user_id' });
    };
    return User;
};