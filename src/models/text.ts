import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

class Text extends Model {
  public id!: number;
  public content!: string;
}

Text.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true, // Don't allow empty strings
      },
    },
  },
  {
    sequelize,
    tableName: 'texts',
  }
);

export default Text;
