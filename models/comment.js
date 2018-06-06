module.exports = function (sequelize, DataTypes) {
  const Comment = sequelize.define('Comment', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1],
    },
  });

  Comment.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Comment;
};
