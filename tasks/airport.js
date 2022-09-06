
const airports =[
  "BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN",
  "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD",
];

const routes = [
  ["DSM", "ORD"],
  ["ORD", "BGI"],
  ["BGI", "LGA"],
  ["SIN", "CDG"],
  ["CDG", "SIN"],
  ["CDG", "BUD"],
  ["DEL", "DOH"],
  ["DEL", "CDG"],
  ["TLV", "DEL"],
  ["EWR", "HND"],
  ["HND", "ICN"],
  ["HND", "JFK"],
  ["ICN", "JFK"],
  ["JFK", "LGA"],
  ["EYW", "LHR"],
  ["LHR", "SFO"],
  ["SFO", "SAN"],
  ["SFO", "DSM"],
  ["SAN", "EYW"],
];

/**
 *
 * @param {string[]} airports
 * @param {string[][]} routes
 * @param {string} start
 */
function getAdditionalRoutes(airports, routes, start) {

  const newRoutes = [];

  const sourcesOf = {};
  const destinationsFrom = {};

  routes.forEach(([src, dest]) => {
    sourcesOf[dest] = sourcesOf[dest] || {};
    sourcesOf[dest][src] = true;

    if (dest !== start) {
      destinationsFrom[src] = destinationsFrom[src] || {};
      destinationsFrom[src][dest] = true;
    }
  });

  const airportsToVisit = new Set(airports);

  function travelTo(hop) {
    if (airportsToVisit.has(hop)) {
      airportsToVisit.delete(hop);
      if (destinationsFrom[hop]) {
        for (let dest of Object.keys(destinationsFrom[hop])) {
          travelTo(dest);
        }
      }
    }
  }

  travelTo(start);

  for (let airport of airports) {
    if (!sourcesOf[airport]) {
      newRoutes.push(airport);
      travelTo(airport);
    }
  }

  function removeDeadEnd(airport) {
    if (!destinationsFrom[airport]) {
      airportsToVisit.delete(airport);
      if (sourcesOf[airport]) {
        Object.keys(sourcesOf[airport]).forEach(source => {
          delete destinationsFrom[source][airport];
          if (!Object.keys(destinationsFrom[source]).length) {
            destinationsFrom[source] = null;
          }
          removeDeadEnd(source);
        })
      }
    }
  }


  airportsToVisit.forEach(removeDeadEnd);

  // go to cycles
  while (airportsToVisit.size) {
    const [airport] = airportsToVisit;
    newRoutes.push(airport)
    travelTo(airport);
  }
  console.log(newRoutes);
  console.log(Array.from(airportsToVisit));


}

getAdditionalRoutes(airports, routes, 'LGA');