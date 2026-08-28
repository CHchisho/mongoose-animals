import mongoose from 'mongoose';
import { Polygon } from 'geojson';
import { Species, SpeciesModel } from '../types/localTypes';

const speciesSchema = new mongoose.Schema<Species>({
  species_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
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

speciesSchema.index({ location: '2dsphere' });

speciesSchema.statics.findByArea = function (polygon: Polygon) {
  const ring = polygon.coordinates[0];
  const lons = ring.map((coord) => coord[0]);
  const lats = ring.map((coord) => coord[1]);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);

  return this.find({
    'location.coordinates.0': { $gte: minLat, $lte: maxLat },
    'location.coordinates.1': { $gte: minLon, $lte: maxLon },
  });
};

speciesSchema.set('toJSON', {
  transform: (_doc, ret) => {
    const { __v, ...rest } = ret;
    return rest;
  },
});

export default mongoose.model<Species, SpeciesModel>(
  'Species',
  speciesSchema,
);
