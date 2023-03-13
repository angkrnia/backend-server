'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Books extends Model {
        // static associate(models) {
        //     // define association here
        //     Books.belongsTo(models.Category);
        // }
    }
    Books.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Id must be filled' },
                    notEmpty: { msg: 'Id must be filled' },
                },
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Title must be filled' },
                    notEmpty: { msg: 'Title must be filled' },
                },
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Author must be filled' },
                    notEmpty: { msg: 'Author must be filled' },
                },
            },
            publisher: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Publisher must be filled' },
                    notEmpty: { msg: 'Publisher must be filled' },
                },
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    validateYear(value) {
                        const currentYear = new Date().getFullYear();
                        if (this.year < 1990 || this.year > currentYear) {
                            throw new Error(
                                `Year must be between 1990 and ${currentYear}`
                            );
                        }
                    },
                },
            },
            isbn: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'ISBN must be filled' },
                    notEmpty: { msg: 'ISBN must be filled' },
                },
            },
            language: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Language must be filled' },
                    notEmpty: { msg: 'Language must be filled' },
                },
            },
            page: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Page must be filled' },
                    notEmpty: { msg: 'Page must be filled' },
                },
            },
            length: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Length must be filled' },
                    notEmpty: { msg: 'Length must be filled' },
                },
            },
            weight: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Weight must be filled' },
                    notEmpty: { msg: 'Weight must be filled' },
                },
            },
            width: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Width must be filled' },
                    notEmpty: { msg: 'Width must be filled' },
                },
            },
            cover: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Cover must be filled' },
                    notEmpty: { msg: 'Cover must be filled' },
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    validateDescription(value) {
                        if (
                            this.description.length > 500 ||
                            this.description.length < 20
                        ) {
                            throw new Error(
                                `Description length min:20 and max:500, Your input is: ${this.description.length}`
                            );
                        }
                    },
                },
            },
            category: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Category must be filled' },
                    notEmpty: { msg: 'Category must be filled' },
                },
            },
            rating: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Rating must be filled' },
                    notEmpty: { msg: 'Rating must be filled' },
                },
            },
            is_borrowed: DataTypes.BOOLEAN,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Books',
        }
    );
    return Books;
};
