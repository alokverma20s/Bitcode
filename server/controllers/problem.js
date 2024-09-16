import mongoose from "mongoose";
import Problem from "../models/Problem.js";

const createProblem = async (req, res) => {
  const {
    title, statement, author, inputFormat, outputFormat, hints, constraints, examples, explanation, difficulty, topics, companies, testcases,starterCode
  } = req.body;
  try {
    const problem = await Problem.create({
      name:title, statement, author, inputFormat, outputFormat, hints, constraints, examples, explanation, difficulty, topics, companies, testcases,starterCode
    });
    return res.status(201).json({
      success: true,
      problem,
      message: "Problem created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while creating problem.",
    });
  }
};

const getProblem = async (req, res) => {
  try {
    const problem = await Problem.find({},
    {name: true, seq: true});
    return res.status(200).json({
      success: true,
      problem,
      message: "Problem fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while fetch problem list.",
    });
  }
};

const getProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await Problem.findById(id);
    return res.status(200).json({
      success: true,
      problem,
      message: "Problem fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while fetch problem list.",
    });
  }
};

const updateProblem = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await Problem.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      problem,
      message: "Problem updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while updating problem.",
    });
  }
};

const deleteProblem = async (req, res) => {
  const { id } = req.params;
  try {
    await Problem.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Problem deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong, while deleting problem.",
    });
  }
};

export {
  createProblem,
  getProblem,
  getProblemById,
  updateProblem,
  deleteProblem,
};
