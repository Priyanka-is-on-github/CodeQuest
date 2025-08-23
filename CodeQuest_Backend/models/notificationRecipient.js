const { mongoose } = require('mongoose');

const NotificationRecipientSchema = new mongoose.Schema({
  
recruiterId: { type: String, required: true , ref:'RecruiterModel'},

  companyName: {
    type: String,
    required: true,
  },
  notificationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification', // References the Notification model
    required: true,
  },
  readAt: {
    type: Date,
    default: null, // `null` means not read yet
  },
  deliveredAt: {
    type: Date,
    default: null, // `null` means not delivered yet
  },
}, { timestamps: true });

const NotificationRecipientModel = mongoose.model('NotificationRecipient', NotificationRecipientSchema);
module.exports = NotificationRecipientModel;