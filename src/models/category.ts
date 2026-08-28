import mongoose from 'mongoose';
import { Category } from '../types/localTypes';

const categorySchema = new mongoose.Schema<Category>({
  category_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
});

categorySchema.set('toJSON', {
  transform: (_doc, ret) => {
    const { __v, ...rest } = ret;
    return rest;
  },
});

export default mongoose.model<Category>('Category', categorySchema);
