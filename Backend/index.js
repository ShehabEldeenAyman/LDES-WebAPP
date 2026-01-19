import express from 'express';
//import ldesRouter from './routes/ldes.js'; // Import your new route file
import { ingestData,ingestToGraphDB } from './services/ldesService.js';
//import { queryGraphDB } from './routes/ldes/ldesSPARQLengine.js';
import { ldesQueryTest1 } from './routes/ldes/ldesQueryTest1.js';

const app = express();
const PORT = 3000;

app.use(express.json());

async function startServer() {
  try {
    console.log("Initializing LDES data...");
    
    // 3. This line blocks execution until ingestion is 100% done
    //await ingestData(); 
    // Ingestion runs in background
  ingestData().then(() => {
    console.log("Background ingestion finished!");
    ingestToGraphDB("http://localhost:7200", "ldes-cache");
  });
    
    console.log("Initialization finished. Starting web server...");

    // 4. Only start listening after data is ready
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    await ldesQueryTest1()

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}


// 5. Execute the startup function
startServer();