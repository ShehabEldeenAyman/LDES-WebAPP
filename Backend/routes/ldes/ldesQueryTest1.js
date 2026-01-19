import { queryGraphDB } from '../../engines/ldesSPARQLengine.js'

export async function ldesQueryTest1(req, res) {
  try {
    const results = await queryGraphDB("http://localhost:7200", "ldes-cache", `
      PREFIX sosa: <http://www.w3.org/ns/sosa/>
      SELECT ?subject ?value ?time ?parameter
      WHERE {
        GRAPH ?g {
          ?subject sosa:observedProperty ?parameter ;
                   sosa:hasSimpleResult ?value ;
                   sosa:resultTime ?time .
        }
      }
      LIMIT 20
    `);

    // Transform the results into a clean array of JSON objects if needed, 
    // or send the raw GraphDB results directly.
    const formattedResults = results.map(observation => ({
      subject: observation.subject,
      parameter: observation.parameter,
      value: observation.value,
      time: observation.time,
      //message: `At ${observation.time}, the ${observation.parameter} was ${observation.value} meters.`
    }));

    // Return the results as a JSON array
    res.status(200).json(formattedResults);

  } catch (error) {
    console.error("Query failed:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}