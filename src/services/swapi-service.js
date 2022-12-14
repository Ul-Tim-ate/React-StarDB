export class SwapiService {
  _apibase = "https://swapi.dev/api/";
  _imagebase = "https://starwars-visualguide.com/assets/img/";
  async getResource(url) {
    const res = await fetch(`${this._apibase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }
  getAllPeople = async () => {
    const res = await this.getResource(`people`);
    return res.results.map(this._transformPerson);
  };
  getPerson = async (id) => {
    return this._transformPerson(await this.getResource(`people/${id}`));
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`planets`);
    return res.results.map(this._transformPlanet);
  };
  getPlanet = async (id) => {
    return this._transformPlanet(await this.getResource(`planets/${id}`));
  };

  getAllStarships = async () => {
    const res = await this.getResource(`starships`);
    return res.results.map(this._transformStarShip);
  };
  getStarship = async (id) => {
    return this._transformStarShip(await this.getResource(`starships/${id}`));
  };
  getPersonImg = ({ id }) => {
    return `${this._imagebase}characters/${id}.jpg`;
  };
  getShipImg = ({ id }) => {
    return `${this._imagebase}starships/${id}.jpg`;
  };
  getPlanetImg = ({ id }) => {
    return `${this._imagebase}planets/${id}.jpg`;
  };

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _transformPlanet = (planet) => {
    return {
      name: planet.name,
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
      costInCredits: starShip.cost_in_credits,
      length: starShip.length,
      crew: starShip.crew,
      passengers: starShip.passengers,
      cargoCapacity: starShip.cargo_capacity,
    };
  };
}
