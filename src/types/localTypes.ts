import {Types, Model} from 'mongoose';
import {Point, Polygon} from 'geojson';

type Category = {
  category_name: string;
};

type Species = {
  species_name: string;
  category: Types.ObjectId | Category;
  location: Point;
  image: string;
};

type Animal = {
  animal_name: string;
  birthdate: Date;
  species: Types.ObjectId | Species;
  location: Point;
};

type AnimalModel = Model<Animal> & {
  findBySpecies: (species_name: string) => Promise<Animal[]>;
};

type SpeciesModel = Model<Species> & {
  findByArea: (polygon: Polygon) => Promise<Species[]>;
};

export {Category, Species, Animal, AnimalModel, SpeciesModel};
