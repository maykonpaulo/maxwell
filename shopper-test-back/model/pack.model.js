import { Sequelize } from 'sequelize';
import { sequelize } from "../config/db.config.js";

const Pack = sequelize.define("pack", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  pack_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'Pack'
});

export default Pack;
