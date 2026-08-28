import {Request, Response, NextFunction} from 'express';
import Category from '../models/category';

const getAllCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({message: 'Category not found'});
      return;
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(201).json({
      message: 'Category created',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {category_name: req.body.category_name},
      {new: true, runValidators: true},
    );
    if (!category) {
      res.status(404).json({message: 'Category not found'});
      return;
    }
    res.json({
      message: 'Category updated',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({message: 'Category not found'});
      return;
    }
    res.json({
      message: 'Category deleted',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
