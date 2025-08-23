const clients = new Map(); // userId -> Set<res>

function addClient(recruiterId, res) {
  if (!clients.has(recruiterId)) clients.set(recruiterId, new Set());
  clients.get(recruiterId).add(res);
}

function removeClient(recruiterId, res) {
  const set = clients.get(recruiterId);
  if (!set) return;
  set.delete(res);
  if (set.size === 0) clients.delete(recruiterId);
}

function sendToUser(recruiterId, eventName='notification', payload={}) {
  const set = clients.get(recruiterId);
  if (!set) return;
  const data = JSON.stringify(payload);
  for (const res of set) {
    try {
      if (payload.recipient && payload.recipient._id) res.write(`id: ${payload.recipient._id}\n`);
      res.write(`event: ${eventName}\n`);
      res.write(`data: ${data}\n\n`);
    } catch (e) {
      console.error('SSE write failed', e);
    }
  }
}

module.exports = { clients, addClient, removeClient,sendToUser};