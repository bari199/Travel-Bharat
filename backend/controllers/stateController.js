import { State } from "../models/state.js";

export const addState = async (req, res) => {

    try {

        const { name } = req.body;

        const state = await State.create({
            name,
            image: req.file?.path
        });

        return res.status(201).json({
            success: true,
            state
        });


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const getStates = async (req, res) => {

    try {

        const states = await State.find();

        return res.status(200).json({
            success: true,
            states
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};