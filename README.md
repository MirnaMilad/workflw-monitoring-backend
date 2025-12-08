# Workflow Monitoring Backend

A clean Node.js backend service for workflow monitoring with real-time event broadcasting using Server-Sent Events (SSE).

## Features

- **REST API Endpoints** for workflow statistics and monitoring
- **Real-time Event Broadcasting** via Server-Sent Events (SSE)
- **Clean Architecture** with separation of concerns
- **Docker Support** for easy deployment
- **CORS Enabled** for frontend integration

## Architecture

```
src/
├── index.js                 # Application entry point
├── config/
│   ├── constants.js         # Application constants
│   └── server.js           # Server configuration
├── controllers/
│   ├── eventController.js  # SSE endpoint handler
│   └── statsController.js  # Statistics endpoints
├── services/
│   ├── eventService.js     # Event broadcasting logic
│   └── statsService.js     # Statistics generation
├── routes/
│   ├── index.js           # Route registration
│   ├── eventRoutes.js     # Event routes
│   └── statsRoutes.js     # Statistics routes
└── middleware/
    └── index.js           # Middleware setup
```

## API Endpoints

### Statistics Endpoints

#### GET `/stats/overview`
Returns workflow overview metrics.

**Response:**
```json
{
  "totalWorkflowsToday": 75,
  "avgCycleTimeHours": 5.23,
  "slaCompliancePercent": 92.5,
  "activeAnomaliesCount": 4
}
```

#### GET `/stats/timeline`
Returns workflow events from the past 24 hours.

**Response:**
```json
{
  "events": [
    {
      "id": "event_1",
      "type": "workflow_completed",
      "timestamp": "2025-12-09T10:30:00.000Z",
      "workflowId": "WF_123"
    }
  ]
}
```

#### GET `/stats/anomalies`
Returns detected anomalies.

**Response:**
```json
{
  "anomalies": [
    {
      "id": "anomaly_1",
      "type": "SLA Breach",
      "severity": "high",
      "timestamp": "2025-12-09T10:30:00.000Z",
      "description": "Detected anomaly in workflow processing"
    }
  ]
}
```

### Real-time Events

#### GET `/events`
Server-Sent Events endpoint for real-time updates.

Broadcasts events every 10-20 seconds with types:
- `sla_breach` - SLA violations detected
- `case_delayed` - Case processing delays
- `workflow_completed` - Successful completions
- `approval_pending` - Approvals required
- `system_alert` - System performance issues

**Event Format:**
```json
{
  "id": "event_1234567890",
  "type": "sla_breach",
  "severity": "high",
  "message": "SLA breach detected on workflow",
  "timestamp": "2025-12-09T10:30:00.000Z",
  "workflowId": "WF_456"
}
```

## Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Docker (optional)

### Local Setup

1. Clone the repository:
```bash
git clone https://github.com/MirnaMilad/workflw-monitoring-backend.git
cd workflw-monitoring-backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

### Development Mode

Run with auto-reload:
```bash
npm run dev
```

## Docker Deployment

### Using Docker

1. Build the image:
```bash
docker build -t workflow-monitoring-backend .
```

2. Run the container:
```bash
docker run -p 3000:3000 workflow-monitoring-backend
```

### Using Docker Compose

Start both backend and frontend:
```bash
docker compose up -d
```

Stop services:
```bash
docker compose down
```

View logs:
```bash
docker compose logs -f
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `NODE_ENV` | development | Environment mode |

## Configuration

Edit `src/config/server.js` to customize:
- `BROADCAST_INTERVAL_MIN`: Minimum broadcast interval (ms)
- `BROADCAST_INTERVAL_MAX`: Maximum broadcast interval (ms)
- `TIMELINE_EVENTS_COUNT`: Number of timeline events
- `ANOMALIES_COUNT`: Number of anomalies to generate

## Project Structure Details

### Services Layer
Business logic and data generation:
- `statsService.js` - Statistics calculation and event generation
- `eventService.js` - SSE client management and broadcasting

### Controllers Layer
Request handling and response formatting:
- `statsController.js` - Statistics endpoint handlers
- `eventController.js` - SSE endpoint handler

### Routes Layer
Endpoint definition and mapping:
- `statsRoutes.js` - `/stats/*` endpoints
- `eventRoutes.js` - `/events` endpoint

### Middleware
Application-wide middleware:
- CORS configuration
- JSON body parsing

## Technologies

- **Express.js** - Web framework
- **Node.js** - Runtime environment
- **Server-Sent Events (SSE)** - Real-time communication
- **Docker** - Containerization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Author

MirnaMilad

## Repository

https://github.com/MirnaMilad/workflw-monitoring-backend