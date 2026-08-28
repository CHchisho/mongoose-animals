import mongoose from 'mongoose';
import { Animal, AnimalModel } from '../types/localTypes';

const animalSchema = new mongoose.Schema<Animal>({
  animal_name: {
    type: String,
    required: true,
    minlength: 2,
  },
  birthdate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value: Date) {
        return value <= new Date();
      },
      message: 'Birthdate cannot be in the future',
    },
  },
  species: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Species',
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

animalSchema.index({ location: '2dsphere' });

animalSchema.statics.findBySpecies = function (species_name: string) {
  return this.aggregate([
    {
      $lookup: {
        from: 'species',
        localField: 'species',
        foreignField: '_id',
        as: 'speciesData',
      },
    },
    { $unwind: '$speciesData' },
    { $match: { 'speciesData.species_name': species_name } },
    {
      $lookup: {
        from: 'categories',
        localField: 'speciesData.category',
        foreignField: '_id',
        as: 'categoryData',
      },
    },
    { $unwind: '$categoryData' },
    {
      $project: {
        _id: 1,
        animal_name: 1,
        birthdate: 1,
        location: 1,
        species: {
          _id: '$speciesData._id',
          species_name: '$speciesData.species_name',
          image: '$speciesData.image',
          location: '$speciesData.location',
          category: {
            _id: '$categoryData._id',
            category_name: '$categoryData.category_name',
          },
        },
      },
    },
  ]);
};

animalSchema.set('toJSON', {
  transform: (_doc, ret) => {
    const { __v, ...rest } = ret;
    return rest;
  },
});

export default mongoose.model<Animal, AnimalModel>('Animal', animalSchema);
