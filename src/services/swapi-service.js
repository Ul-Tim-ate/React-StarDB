export class SwapiService {
  _apibase = "https://swapi.dev/api/";
  async getResource(url) {
      const res = await fetch(`${this._apibase}${url}`);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`);
      }
      return await res.json();
  }
  async getAllPeople() {
    const res = await this.getResource(`people`);
    return res.results.map(this._transformPerson);
  }
  async getPerson(id) {
    return this._transformPerson(await this.getResource(`people/${id}`));
  }

  async getAllPlanets() {
    const res = await this.getResource(`planets`);
    return res.results.map(this._transformPlanet);
  }
  async getPlanet(id) {
    return this._transformPlanet(await this.getResource(`planets/${id}`));
  }

  async getAllStarships() {
    const res = await this.getResource(`starships`);
    return res.results.map(this._transformStarShip);
  }
  async getStarship(id) {
    return this._transformStarShip(await this.getResource(`starships/${id}`));
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _transformPlanet = (planet) => {
    return {
      planetName: planet.name,
      id: this._extractId(planet),
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  };
  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
    };
  };
  _transformStarShip = (starShip) => {
    return {
      id: this._extractId(starShip),
      name: starShip.name,
      model: starShip.model,
      manufacturer: starShip.manufacturer,
      constInCredits: starShip.constInCredits,
      length: starShip.length,
      crew: starShip.crew,
      passengers: starShip.passengers,
      cargoCapacity: starShip.cargoCapacity,
    };
  };
}
