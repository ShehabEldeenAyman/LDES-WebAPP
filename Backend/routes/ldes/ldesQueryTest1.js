import { queryGraphDB } from './ldesSPARQLengine.js'

export async function  ldesQueryTest1(){
    const results = await queryGraphDB("http://localhost:7200", "ldes-cache",`
 
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
    `)
    console.log(JSON.stringify(results, null, 2));
    results.forEach(observation => {
  const waterLevel = observation.value;
  const timestamp = observation.time;
  const parameter = observation.parameter

  console.log(`At ${timestamp}, the ${parameter} was ${waterLevel} meters.`);
});

}