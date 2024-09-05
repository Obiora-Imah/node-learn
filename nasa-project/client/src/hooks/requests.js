const API_HOST = process.env.API_HOST || 'http://localhost:8000/v1';
async function httpGetPlanets() {
  const planets = await fetch(`${API_HOST}/planets`)
  const body = await planets.json()
  console.log(body)
  return body
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const launches = await fetch(`${API_HOST}/launches` )
  const body = await launches.json()
  return body.sort((a, b) => {
    return a.flightNumber - b.flightNumber
  });
}

async function httpSubmitLaunch(launch) {
  try{
    return await fetch(`${API_HOST}/launches`,{ method: "post", body: JSON.stringify(launch), headers: {
      "Content-Type": "application/json"
    }})
  } catch (error){
    return {
      ok: false
    }
  }
}

async function httpAbortLaunch(id) {
  try{
    return await fetch(`${API_HOST}/launches/${id}`,{ method: "delete", headers: {
      "Content-Type": "application/json"
    }})
  } catch (error){
    return {
      ok: false
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};