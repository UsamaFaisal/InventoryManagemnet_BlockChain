const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// id: '',
// name: 'Soap',
// buyrate: '300',
// description: 'Good',
// expirydate: '20-2-2024',
// sellrate: '400',
// quantity: '10'
// }
const productSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique:true
  },
  name: {
    type: String,
    required: true
  },
  buyrate: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  expirydate: {
    type: Date,
    required: true,
    get: function (value) {
        // Format the expirydate as "YYYY-MM-DD"
        if (value) {
          const year = value.getFullYear();
          const month = String(value.getMonth() + 1).padStart(2, '0');
          const day = String(value.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        }
        return value;
      },
      set: function (value) {
        // Parse the expirydate from "YYYY-MM-DD" to a Date object
        if (value) {
          const parts = value.split('-');
          const year = parseInt(parts[0]);
          const month = parseInt(parts[1]) - 1;
          const day = parseInt(parts[2]);
          return new Date(year, month, day);
        }
        return value;
      }
  },
  sellrate: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
