import mongoose from "mongoose";
import Notes from "../models/Notes.js";
import { createError } from "../error.js";

export const getNotes = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const notes = await Notes.find();

    if (!notes) {
      return next(createError(404, "No notes created"));
    }

    const todos = await Notes.find().skip(skip).limit(limit).sort({ date: -1 });
    const total = await Notes.countDocuments();

    res.status(200).json({
      success: true,
      total,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const note = await Notes.create({ title, description });
    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const note = await Notes.findByIdAndUpdate(id, { title, description });
    if (!note) {
      return next(createError(404, "Note not found"));
    }
    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Notes.findByIdAndDelete(id);
    if (!note) {
      return next(createError(404, "Note not found"));
    }
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Notes.findById(id);
    if (!note) {
      return next(createError(404, "Note not found"));
    }
    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};
