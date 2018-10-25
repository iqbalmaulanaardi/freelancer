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
    }, {});
    User.associate = function(models) {
        // associations can be defined here
        User.belongsToMany(models.Project, { through: models.ProjectUser, foreignKey: 'user_id' });
    };
    return User;
};