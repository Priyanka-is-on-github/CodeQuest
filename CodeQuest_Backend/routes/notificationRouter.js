const express = require("express");
const router = express.Router();

// const requireAuth = require("../middleware/auth");


const NotificationRecipientModel = require("../models/notificationRecipient");

const { addClient, removeClient , sendToUser} = require('../libs/SSEManager');
const NotificationModel = require("../models/notification");

const HEARTBEAT_MS = Number(process.env.SSE_HEARTBEAT_MS || 20000);


router.post("/",  async (req, res) => {
  try {
    const { message, companyName } = req.body;
    if (!message || !companyName) {
      return res
        .status(400)
        .json({ error: "message and companyname required" });
    }

    // create notification doc
    const notification = await NotificationModel.create({
      message,
      companyName,
    });

    const recruiters = await recruiterModel.find({ companyName }, { _id: 1 });
    const recruiterIds = recruiters.map((u) => u._id.toString());
    const recipientDocs = recruiterIds.map((uid) => ({
      notificationId: notification._id,
      recruiterId: uid,
      companyName,
      readAt: null,
      deliveredAt: null,
    }));

    const createdRecipients = await NotificationRecipientModel.insertMany(
      recipientDocs
    );

    // publish per user via SSE
    for (const r of createdRecipients) {
      const payload = {
        recipient: {
          _id: r._id,
          notificationId: r.notificationId,
          recruiterId: r.recruiterId,
          companyName: r.companyName,
         
          readAt:r.readAt,
          deliveredAt:r.deliveredAt,
          notification: {
            _id: notification._id,
            message: notification.message,
            companyName: notification.companyName,
            createdAt: notification.createdAt,
          },
        },
      };
      // build small payloads for SSE (recipient + minimal notification)

      sendToUser(r.recruiterId, "notification", payload);
    }
    return res.status(201).json({ notification, recipientsCount: createdRecipients.length });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal_error" });
  }
});



router.get('/recent', async (req, res) => {
  try {
    const recruiterId = req.query.id;
    const limit = Number(req.query.limit) || 4;

   

    const recips = await NotificationRecipientModel.find({ recruiterId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('notificationId');

 

    const out = recips.map(r => ({
      recipientId: r._id,
      readAt: r.readAt,
      deliveredAt: r.deliveredAt,
     
      notification: r.notificationId ? {
        _id: r.notificationId._id,
        message: r.notificationId.message,
        companyName: r.notificationId.companyName,
        createdAt: r.notificationId.createdAt
      } : null
    }));

    return res.json({ notifications: out });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
});


// router.patch('/:recipientId',  async (req, res) => {
//   try {
//     const { recipientId } = req.params;
//     const { action } = req.body;
//     const recruiterId = req.query.id;

//     if (action === 'delivered') {
//       const result = await NotificationRecipientModel.updateOne(
//         { _id: recipientId, recruiterId, deliveredAt: null },
//         { $set: { deliveredAt: new Date() } }
//       );
//       if (result.matchedCount === 0) return res.status(404).json({ error: 'not_found_or_already_delivered' });
//       return res.json({ ok: true });
//     } else if (action === 'read') {
//   const result = await  NotificationRecipientModel.updateOne(
//     { _id: recipientId, recruiterId, readAt: null },
//     { $set: { readAt: new Date() } }
//   );
//   // count unread after update (idempotent even if nothing changed)
//   const unreadCount = await NotificationRecipientModel.countDocuments({ recruiterId, readAt: null });
//   if (result.matchedCount === 0) {
//     // either not found or already read
//     return res.json({ ok: true, unreadCount });
//   }
//   return res.json({ ok: true, unreadCount });
// } else {
//       return res.status(400).json({ error: 'invalid_action' });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'internal_error' });
//   }
// });


router.get('/stream', (req, res) => {
  const {recruiterId} = req.query;
  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders && res.flushHeaders();

  // initial ping
  res.write(': connected\n\n');

  addClient(recruiterId, res);

  const interval = setInterval(() => {
    try { res.write(': keepalive\n\n'); } catch (e) {}
  }, HEARTBEAT_MS);

  req.on('close', () => {
    clearInterval(interval);
    removeClient(recruiterId, res);
  });
});
// GET /api/notifications/unread-count
router.get('/unread-count', async (req, res) => {
  try {
    const recruiterId = req.query.id;
    const count = await NotificationRecipientModel.countDocuments({ recruiterId, readAt: null });
    return res.json({ unreadCount: count });
  } catch (err) {
    console.error('unread-count error', err);
    return res.status(500).json({ error: 'internal_error' });
  }
});


router.patch('/read-all',  async (req, res) => {
  try {
    const recruiterId = req.query.id;

   
    await NotificationRecipientModel.updateMany(
      { recruiterId, readAt: null },
      { $set: { readAt: new Date() } }
    );

    // return authoritative unread count (should be 0 but compute to be safe)
    const unreadCount = await NotificationRecipientModel.countDocuments({ recruiterId, readAt: null });

    return res.json({ ok: true, unreadCount });
  } catch (err) {
    console.error('read-all error', err);
    return res.status(500).json({ error: 'internal_error' });
  }
});


module.exports = router; 
