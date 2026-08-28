import express from 'express';
import {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalsByLocation,
  getAnimalsBySpecies,
} from '../controllers/animalController';

const router = express.Router();

router.get('/location', getAnimalsByLocation);
router.get('/species/:species', getAnimalsBySpecies);
router.get('/', getAllAnimals);
router.get('/:id', getAnimalById);
router.post('/', createAnimal);
router.put('/:id', updateAnimal);
router.delete('/:id', deleteAnimal);

export default router;
