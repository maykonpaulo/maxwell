import { Sequelize } from 'sequelize';
import { sequelize } from "../config/db.config.js";

const Product = sequelize.define("product", {
  code: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cost_price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  sales_price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'Product'
});

export default Product;
