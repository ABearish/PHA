# 🚀 PHA Tracker: Asteroid Monitoring System

---

## Project Summary

The PHA (Potentially Hazardous Asteroid) Tracker is a full-stack monitoring application designed to ingest asteroid approach data from the NASA NeoWs API, persist it in a secure database, and display critical close-approach information to the user via a responsive React frontend.

 ---
## Key features highlighted for Engineering roles:
- Containerization: Full system orchestration via Docker Compose.
- System Reliability: Custom Node.js worker with exponential backoff and retry logic to handle external API rate limits.
- Data Integrity: Secure, authenticated MongoDB setup using named volumes for persistent data.- Data Pipeline: Separation of concerns between a dedicated data worker (ingestion) and the Express API (serving cached data).

---

## 🛠️ Technical Stack

 
| Category       | Technology                              | Purpose                                                    |
| -------------- | --------------------------------------- | ---------------------------------------------------------- |
| Frontend       | React.js (Functional Components, Hooks) | Responsive, modern UI using Tailwind CSS                   |
| Backend        | Node.js / Express                       | RESTful API server for data retrieval                      |
| Database       | MongoDB (Mongoose)                      | High-volume, flexible data persistence layer.              |
| Orchestration  | Docker / Docker Compose                 | Multi-service application defined for easy deployment.     |
| Worker Service | Node.js                                 | Worker Custom script for robust, scheduled data ingestion. |

## ⚙️ Architecture and Deployment (Coming Soon)

The application runs as a secure, three-tier microservice architecture managed by Docker Compose:
- mongo: The database service, secured with authentication and using a named volume (mongo_data) for guaranteed persistence across container restarts.
- app: The Node/Express API, which serves the frontend and handles requests for cached data from MongoDB.
- worker: A dedicated one-off service that executes the data ingestion script.

---

## Prerequisites

### Docker Implementation (In progress)
- Docker and Docker Compose installed.
- A .env file in the root directory containing the required credentials: (
- .env file content (REQUIRED) 
- MONGO_INIT_ROOT_USERNAME/PASSWORD are used to secure the database.
- MONGO_INIT_ROOT_USERNAME=myuser
- MONGO_INIT_ROOT_PASSWORD=mypass
- MONGO_URI=mongodb://myuser:mypass@mongo:27017/PHA
  
### Installation and Run Instructions

1. Build and Start the Core Services (API & Database): `npm run build` then `npm start`
	- This starts the Express API (app) and the secure MongoDB instance (mongo) docker compose up -d app mongo
2. Execute the Data Ingestion Worker: `npm run populate`
	- Since the NASA API only returns 7 days of data per call, the worker script is designed to loop through all of 2025 data chunks (approx 45 calls)
	- Run the worker script ONCE to populate the database with 2025 data.
	- Use `NPM run "populate"`, It will populate the MongoDB from a **JSON file** with 2025 PHA asteroids. Removing the need for an API key to demo the app.
	- The `--rm` flag ensures the worker container is destroyed upon successful completion. `docker compose run --rm worker` (In progress)
3. Access the Application: 
	- The Express application is mapped to port 80 (as defined in docker-compose.yml).
	- Open your browser to: http://localhost/
---

## 💻 Systems Engineering Highlights

1. Robust Data Pipeline and Resilience:
- The worker service implements a critical SRE (Site Reliability Engineering) pattern: API Call Retries.
- Uses async/await to control flow.
- A custom delay function is implemented to pause execution and re-attempt the API call up to three times upon receiving a non-200 HTTP status code (e.g., rate limit hit). This ensures data ingestion reliability despite transient external service failures.

2. Security and Persistence:
- Authentication: Database access requires explicit environment variables
- (MONGO_INIT_ROOT_USERNAME, MONGO_INIT_ROOT_PASSWORD), eliminating hard-coded credentials.
- Persistence: The mongo_data named volume is used to store all database files, guaranteeing that the populated asteroid data remains available even if the MongoDB container is stopped and restarted.

3. Separation of Concerns:
- The architecture strictly separates the WRITE function (the worker service, which is slow and error-prone due to API calls) from the READ function (the app API, which serves fast, cached data to the front end). This design prevents user experience degradation when the nightly data ingestion runs.
