import {Request, Response, NextFunction} from 'express';
import Species from '../models/species';

const getAllSpecies = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const species = await Species.find();
    res.json(species);
  } catch (error) {
    next(error);
  }
};

const getSpeciesById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const species = await Species.findById(req.params.id);
    if (!species) {
      res.status(404).json({message: 'Species not found'});
      return;
    }
    res.json(species);
  } catch (error) {
    next(error);
  }
};

const createSpecies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const species = await Species.create({
      species_name: req.body.species_name,
      image: req.body.image,
      category: req.body.category,
      location: req.body.location,
    });
    res.status(201).json({
      message: 'Species created',
      data: species,
    });
  } catch (error) {
    next(error);
  }
};

const updateSpecies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const species = await Species.findByIdAndUpdate(
      req.params.id,
      {
        species_name: req.body.species_name,
        location: req.body.location,
      },
      {new: true, runValidators: true},
    );
    if (!species) {
      res.status(404).json({message: 'Species not found'});
      return;
    }
    res.json({
      message: 'Species updated',
      data: species,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSpecies = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const species = await Species.findByIdAndDelete(req.params.id);
    if (!species) {
      res.status(404).json({message: 'Species not found'});
      return;
    }
    res.json({
      message: 'Species deleted',
      data: species,
    });
  } catch (error) {
    next(error);
  }
};

const getSpeciesByArea = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const species = await Species.findByArea(req.body);
    res.json(species);
  } catch (error) {
    next(error);
  }
};

export {
  getAllSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies,
  getSpeciesByArea,
};
