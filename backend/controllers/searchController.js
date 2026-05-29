import { Destination } from "../models/destination.js";

export const searchDestination = async (req, res) => {

    try {

         console.log(req.body);

        const state = req.body?.state;
        const city = req.body?.city;
        const category = req.body?.category;
        const search = req.body?.search;

        let query = {};



        /* SEARCH */

        if (search) {

            query.$or = [

                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    city: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    state: {
                        $regex: search,
                        $options: "i"
                    }
                }

            ];

        }



        /* FILTER */

        if (state) {

            query.state = {
                $regex: state,
                $options: "i"
            };

        }



        if (city) {

            query.city = {
                $regex: city,
                $options: "i"
            };

        }



        if (category) {

            query.category = {
                $regex: category,
                $options: "i"
            };

        }



        const destinations = await Destination.find(query);



        return res.status(200).json({

            success: true,

            total: destinations.length,

            destinations

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

}