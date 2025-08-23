const { mongoose } = require('mongoose');

const NotificationSchema = new mongoose.Schema({

  message: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  }

}, { timestamps: true }); // `timestamps` auto-adds `createdAt` and `updatedAt`

const NotificationModel = mongoose.model('Notification', NotificationSchema);
module.exports = NotificationModel;