import express from 'express';
//import ldesRouter from './routes/ldes.js'; // Import your new route file
import { ingestData,ingestToGraphDB } from './services/ldesService.js';
import { queryGraphDB } from './routes/ldes/test1.js';
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

    const results = await queryGraphDB("http://localhost:7200", "ldes-cache",`
 
PREFIX sosa: <http://www.w3.org/ns/sosa/>

SELECT ?subject ?value ?time
WHERE {
  GRAPH ?g {
    ?subject sosa:observedProperty "River Stage" ;
             sosa:hasSimpleResult ?value ;
             sosa:resultTime ?time .
  }
}
LIMIT 10
    `)
    console.log(JSON.stringify(results, null, 2));

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}
// async function startServer() {
//   try {
//     console.log("Initializing LDES data...");
    
//     // 3. This line blocks execution until ingestion is 100% done
//     //await ingestData(); 
//     // Ingestion runs in background
//   ingestData().then(() => {
//     console.log("Background ingestion finished!");
//     ingestToGraphDB("http://localhost:7200", "ldes-cache");
//   });
    
//     console.log("Initialization finished. Starting web server...");

//     // 4. Only start listening after data is ready
//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });

//     const sparqlQuery = ` SELECT ?g ?subject ?predicate ?object
//       WHERE {
//         GRAPH ?g {
//           ?subject ?predicate ?object .
//         }
//       }
//       LIMIT 90000`

//       const rawResults = await queryGraphDB("http://localhost:7200", "ldes-cache", sparqlQuery);

//       // Transform the flat triples into grouped objects by subject
//       const groupedResults = rawResults.reduce((acc, triple) => {
//         const { subject, predicate, object } = triple;

//         // If we haven't seen this subject yet, create a new entry
//         if (!acc[subject]) {
//           acc[subject] = { id: subject };
//         }

//         // Use the local name of the predicate as the key (e.g., 'hasSimpleResult')
//         // or keep the full URI if you prefer.
//         const key = predicate.split(/[#/]/).pop(); 
//         acc[subject][key] = object;

//         return acc;
//       }, {});

//       // Convert the dictionary back into a clean array of objects
//       const finalJson = Object.values(groupedResults);

//       console.log(JSON.stringify(finalJson, null, 2));
  

//   } catch (error) {
//     console.error("Failed to start server:", error);
//     process.exit(1);
//   }
// }

// 5. Execute the startup function
startServer();