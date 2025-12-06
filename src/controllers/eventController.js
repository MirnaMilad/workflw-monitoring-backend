const eventService = require('../services/eventService');

class EventController {
  handleSSE(req, res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    res.write('data: {"type":"connected","message":"Connected to event stream"}\n\n');
    
    eventService.addClient(res);
    
    req.on('close', () => {
      eventService.removeClient(res);
    });
  }
}

module.exports = new EventController();
