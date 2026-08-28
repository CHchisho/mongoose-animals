import { Request, Response, NextFunction } from 'express';
import Animal from '../models/animal';

const populateOptions = {
  path: 'species',
  select: '-__v',
  populate: {
    path: 'category',
    select: '-__v',
  },
};

const getAllAnimals = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const animals = await Animal.find()
      .select('-__v')
      .populate(populateOptions);
    res.json(animals);
  } catch (error) {
    next(error);
  }
};

const getAnimalById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const animal = await Animal.findById(req.params.id)
      .select('-__v')
      .populate(populateOptions);
    if (!animal) {
      res.status(404).json({ message: 'Animal not found' });
      return;
    }
    res.json(animal);
  } catch (error) {
    next(error);
  }
};

const createAnimal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const animal = await Animal.create({
      animal_name: req.body.animal_name,
      birthdate: req.body.birthdate,
      species: req.body.species,
      location: req.body.location,
    });
    res.status(201).json({
      message: 'Animal created',
      data: animal,
    });
  } catch (error) {
    next(error);
  }
};

const updateAnimal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const animal = await Animal.findByIdAndUpdate(
      req.params.id,
      {
        animal_name: req.body.animal_name,
        birthdate: req.body.birthdate,
        location: req.body.location,
      },
      { new: true, runValidators: true },
    );
    if (!animal) {
      res.status(404).json({ message: 'Animal not found' });
      return;
    }
    res.json({
      message: 'Animal updated',
      data: animal,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAnimal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) {
      res.status(404).json({ message: 'Animal not found' });
      return;
    }
    res.json({
      message: 'Animal deleted',
      data: animal,
    });
  } catch (error) {
    next(error);
  }
};

const getAnimalsByLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const topRight = (req.query.topRight as string).split(',').map(Number);
    const bottomLeft = (req.query.bottomLeft as string).split(',').map(Number);

    const minLat = Math.min(topRight[0], bottomLeft[0]);
    const maxLat = Math.max(topRight[0], bottomLeft[0]);
    const minLon = Math.min(topRight[1], bottomLeft[1]);
    const maxLon = Math.max(topRight[1], bottomLeft[1]);

    const animals = await Animal.find({
      'location.coordinates.0': { $gte: minLat, $lte: maxLat },
      'location.coordinates.1': { $gte: minLon, $lte: maxLon },
    })
      .select('-__v')
      .populate(populateOptions);

    res.json(animals);
  } catch (error) {
    next(error);
  }
};

const getAnimalsBySpecies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const animals = await Animal.findBySpecies(req.params.species);
    res.json(animals);
  } catch (error) {
    next(error);
  }
};

export {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalsByLocation,
  getAnimalsBySpecies,
};
