const { BROADCAST_EVENT_TYPES } = require('../config/constants');
const { BROADCAST_INTERVAL_MIN, BROADCAST_INTERVAL_MAX } = require('../config/server');

class EventService {
  constructor() {
    this.clients = new Set();
    this.broadcastTimer = null;
  }

  addClient(client) {
    this.clients.add(client);
    console.log(`Client connected. Total clients: ${this.clients.size}`);
  }

  removeClient(client) {
    this.clients.delete(client);
    console.log(`Client disconnected. Total clients: ${this.clients.size}`);
  }

  broadcastEvent(event) {
    const data = `data: ${JSON.stringify(event)}\n\n`;
    this.clients.forEach(client => {
      try {
        client.write(data);
      } catch (error) {
        console.error('Error broadcasting to client:', error.message);
        this.removeClient(client);
      }
    });
  }

  generateRandomEvent() {
    const randomEventType = BROADCAST_EVENT_TYPES[
      Math.floor(Math.random() * BROADCAST_EVENT_TYPES.length)
    ];
    
    return {
      id: `event_${Date.now()}`,
      ...randomEventType,
      timestamp: new Date().toISOString(),
      workflowId: `WF_${Math.floor(Math.random() * 1000)}`
    };
  }

  startBroadcasting() {
    const broadcast = () => {
      if (this.clients.size > 0) {
        const event = this.generateRandomEvent();
        console.log(`📡 Broadcasting event: ${event.type} (${this.clients.size} clients)`);
        this.broadcastEvent(event);
      }
      
      const randomInterval = Math.random() * 
        (BROADCAST_INTERVAL_MAX - BROADCAST_INTERVAL_MIN) + 
        BROADCAST_INTERVAL_MIN;
      
      this.broadcastTimer = setTimeout(broadcast, randomInterval);
    };
    
    broadcast();
  }

  stopBroadcasting() {
    if (this.broadcastTimer) {
      clearTimeout(this.broadcastTimer);
      this.broadcastTimer = null;
    }
  }
}

module.exports = new EventService();
