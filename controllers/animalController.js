// controllers/animalController.js
const animalService = require('../services/animalService');

/**
 * Create a new animal
 */
const createAnimal = async (req, res) => {
  try {
    const animal = await animalService.createAnimal(req.body);
    res.status(201).json(animal);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get all animals
 */
const getAllAnimals = async (req, res) => {
  try {
    const query = req.query; // You can parse and validate query parameters here
    const animals = await animalService.getAllAnimals(query);
    res.status(200).json(animals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get animal by ID
 */
const getAnimalById = async (req, res) => {
  try {
    const animal = await animalService.getAnimalById(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    res.status(200).json(animal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update animal by ID
 */
const updateAnimal = async (req, res) => {
  try {
    const updatedAnimal = await animalService.updateAnimal(req.params.id, req.body);
    if (!updatedAnimal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    res.status(200).json(updatedAnimal);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete animal by ID
 */
const deleteAnimal = async (req, res) => {
  try {
    const deleted = await animalService.deleteAnimal(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    res.status(200).json({ message: 'Animal deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
};