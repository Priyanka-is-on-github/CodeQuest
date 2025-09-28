import { useAuth } from '@/context/AuthProvider';
import { useEffect, useRef, useState } from 'react';

export type NotificationType = {
 
  recruiterId: string;
  
  deliveredAt?: string | null; 
  readAt?: string;

  
  notification?: {
    _id: string;
    message: string;
    companyName: string;
    createdAt: string;
  };
};


 function useNotifications({ limit = 4 } = {}) {
  const [list, setList] = useState<NotificationType[]>([]);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
 const esRef = useRef<EventSource | null>(null);
  const {user} = useAuth()

 
  // BroadcastChannel for multi-tab sync
  const bcRef = useRef(typeof window !== 'undefined' && 'BroadcastChannel' in window ? new BroadcastChannel('notifications_channel') : null);

  useEffect(() => {
    fetchRecent();      // fill list
    fetchUnreadCount(); // fill badge

    // Listen for BroadcastChannel messages (other tabs)
    const bc = bcRef.current;
    if (bc) {
      bc.onmessage = (ev) => {
        const { type, payload } = ev.data || {};
        if (type === 'MARK_ALL_READ') {
          // other tab marked all read — update local state
          setList((prev:any) => prev.map((i:any) => ({ ...i, readAt: i.readAt || new Date().toISOString() })));
          setUnreadCount(0);
        } else if (type === 'NEW_NOTIFICATION') {
          // other tab inserted a new incoming notification — optional
          const r = payload;
          setList((prev:any) => {
            const filtered = prev.filter((x:any) => x.recipientId !== r.recipientId);
            return [{ recruiterId: r.recruiterId, readAt: r.readAt, deliveredAt: r.deliveredAt, createdAt: r.createdAt, notification: r.notification }, ...filtered].slice(0, limit);
          });
          setUnreadCount(c => c + 1);
        }
      };
    }

    // SSE connection
    const es = new EventSource(`${import.meta.env.VITE_SERVER_URL}/api/v1/notifications/stream`, { withCredentials: true });
    esRef.current = es;

    es.addEventListener('notification', (e) => {
      try {
        const payload = JSON.parse(e.data);
        const r = payload.recipient;
        const item = {
          recruiterId: r._id,
          readAt: r.readAt,
          deliveredAt: r.deliveredAt,
          createdAt: r.createdAt,
          notification: r.notification
        };

        // Deduplicate and insert on top
        setList((prev:any) => {
          const filtered = prev.filter((x:any) => x.recruiterId !== item.recruiterId);
          return [item, ...filtered].slice(0, limit);
        });

        // increment unread (if not already read)
        if (!r.readAt) setUnreadCount(c => c + 1);

        // Optionally inform other tabs of new notification
        if (bc) bc.postMessage({ type: 'NEW_NOTIFICATION', payload: item });
      } catch (err) {
        console.warn('SSE parse error', err);
      }
    });

    es.onerror = (err) => {
      console.warn('SSE error', err);
    };

    return () => {
      es.close();
      if (bc) bc.close();
    };
  }, []); // run once

  // fetch unread count
  async function fetchUnreadCount() {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/notifications/unread-count?id=${user.id}`, { credentials: 'include' });
      if (!res.ok) throw new Error('failed');
      const json = await res.json();
      setUnreadCount(Number(json.unreadCount || 0));
    } catch (err) {
      console.warn('fetchUnreadCount failed', err);
    }
  }

  // fetch recent notifications (for dropdown)
  async function fetchRecent() {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/notifications/recent?limit=${limit}&id=${encodeURIComponent(user.id)}`, { credentials: 'include' });
      if (!res.ok) throw new Error('fetch failed');
      const json = await res.json();

      const items = json.notifications.map((n:any) => ({
        recruiterId: n.recruiterId,
        readAt: n.readAt,
        deliveredAt: n.deliveredAt,
        createdAt: n.createdAt,
        notification: n.notification
      }));

     

      setList(items);
      return items;
    } catch (err) {
      console.error('fetchRecent error', err);
      return [];
    }
  }

  // // mark single as read (existing)
  // async function markRead(recipientId:string) {
  //   setList(prev => prev.map(i => i.recipientId === recipientId ? { ...i, readAt: new Date().toISOString() } : i));
  //   setUnreadCount(prev => Math.max(0, prev - 1));
  //   try {
  //     const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/notifications/${recipientId}`, {
  //       method: 'PATCH',
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'include',
  //       body: JSON.stringify({ action: 'read' })
  //     });
  //     if (!res.ok) throw new Error('markRead failed');
  //     const json = await res.json();
  //     if (typeof json.unreadCount === 'number') setUnreadCount(json.unreadCount);
  //     // let other tabs know a single item was marked read (optional)
  //     const bc = bcRef.current;
  //     if (bc) bc.postMessage({ type: 'SINGLE_READ', payload: { recipientId } });
  //   } catch (err) {
  //     console.warn('markRead error', err);
  //     // fallback: re-sync
  //     fetchUnreadCount();
  //     fetchRecent();
  //   }
  // }

  // MARK ALL READ: optimistic local changes + server call + BroadcastChannel notify
  async function markAllReadOnOpen() {
    // optimistic UI update
    setList((prev:any) => prev.map((i:any) => ({ ...i, readAt: i.readAt || new Date().toISOString() })));
    setUnreadCount(0);

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/notifications/read-all?id=${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!res.ok) throw new Error('markAllRead failed');
      const json = await res.json();
      if (typeof json.unreadCount === 'number') setUnreadCount(json.unreadCount);

      // notify other tabs to update UI
      const bc = bcRef.current;
      if (bc) bc.postMessage({ type: 'MARK_ALL_READ' });
    } catch (err) {
      console.warn('markAllRead error', err);
      // fallback: re-sync
      fetchUnreadCount();
      fetchRecent();
    }
  }

  return {
    list,
    open,
    setOpen,
    unreadCount,
    fetchRecent,
    
    markAllReadOnOpen
  };
}

export default useNotifications