import express from 'express';
import {
  getAllSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies,
  getSpeciesByArea,
} from '../controllers/speciesController';

const router = express.Router();

router.post('/area', getSpeciesByArea);
router.get('/', getAllSpecies);
router.get('/:id', getSpeciesById);
router.post('/', createSpecies);
router.put('/:id', updateSpecies);
router.delete('/:id', deleteSpecies);

export default router;
