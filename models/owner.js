'use strict';
module.exports = (sequelize, DataTypes) => {
    const Owner = sequelize.define('Owner', {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        address: DataTypes.STRING,
        email: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        company: DataTypes.STRING,
        salt: DataTypes.TEXT
    }, {});
    Owner.associate = function(models) {
        // associations can be defined here
        Owner.hasMany(models.Project, { foreignKey: 'owner_id' })
    };
    return Owner;
};