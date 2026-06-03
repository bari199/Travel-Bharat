import { Destination } from "../models/destination.js";

/*
|--------------------------------------------------------------------------
| ADD DESTINATION
|--------------------------------------------------------------------------
*/
export const addDestination = async (req, res) => {
  try {
    console.log("BODY");
    console.log(req.body);

    console.log("FILES");
    console.log(req.files);

    const destination = await Destination.create({
      ...req.body,
    });

    return res.status(201).json({
      success: true,
      message: "Destination Added Successfully",
      destination,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL DESTINATIONS
|--------------------------------------------------------------------------
*/
export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();

    return res.status(200).json({
      success: true,
      destinations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE DESTINATION
|--------------------------------------------------------------------------
*/
export const getSingleDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      destination,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE DESTINATION
|--------------------------------------------------------------------------
*/
export const updateDestination = async (req, res) => {
  try {
    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Destination Updated Successfully",
      updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE DESTINATION
|--------------------------------------------------------------------------
*/
export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination Not Found",
      });
    }

    await Destination.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};