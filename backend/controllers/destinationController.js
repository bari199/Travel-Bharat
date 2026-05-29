import { Destination } from "../models/destination.js";



/*
|--------------------------------------------------------------------------
| ADD DESTINATION
|--------------------------------------------------------------------------
*/
export const addDestination = async(req,res)=>{

    try {

        // Main Destination Images
        const imageUrls =
        req.files?.images?.map(
            file => file.path
        ) || [];


        // Nearby Place Images
        const placeImageUrls =
        req.files?.placeImages?.map(
            file => file.path
        ) || [];


        const destination =
        await Destination.create({

            ...req.body,

            images:imageUrls,

            placeImages:placeImageUrls

        });


        return res.status(201).json({

            success:true,

            message:"Destination Added Successfully",

            destination

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};






/*
|--------------------------------------------------------------------------
| GET ALL DESTINATIONS
|--------------------------------------------------------------------------
*/
export const getDestinations = async(req,res)=>{

    try {

        const destinations =
        await Destination.find();

        return res.status(200).json({

            success:true,

            destinations

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};







/*
|--------------------------------------------------------------------------
| GET SINGLE DESTINATION
|--------------------------------------------------------------------------
*/
export const getSingleDestination = async(req,res)=>{

    try {

        const destination =
        await Destination.findById(
            req.params.id
        );

        if(!destination){

            return res.status(404).json({

                success:false,

                message:"Destination Not Found"

            });

        }

        return res.status(200).json({

            success:true,

            destination

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};







/*
|--------------------------------------------------------------------------
| UPDATE DESTINATION
|--------------------------------------------------------------------------
*/
export const updateDestination = async(req,res)=>{

    try {

        // Main Images
        const imageUrls =
        req.files?.images?.map(
            file => file.path
        ) || [];


        // Place Images
        const placeImageUrls =
        req.files?.placeImages?.map(
            file => file.path
        ) || [];


        const updateData = {

            ...req.body

        };


        // Update Main Images
        if(imageUrls.length > 0){

            updateData.images = imageUrls;

        }


        // Update Place Images
        if(placeImageUrls.length > 0){

            updateData.placeImages =
            placeImageUrls;

        }


        const updated =
        await Destination.findByIdAndUpdate(

            req.params.id,

            updateData,

            {
                new:true
            }

        );


        return res.status(200).json({

            success:true,

            message:"Destination Updated Successfully",

            updated

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};







/*
|--------------------------------------------------------------------------
| DELETE DESTINATION
|--------------------------------------------------------------------------
*/
export const deleteDestination = async(req,res)=>{

    try {

        const destination =
        await Destination.findById(
            req.params.id
        );

        if(!destination){

            return res.status(404).json({

                success:false,

                message:"Destination Not Found"

            });

        }


        await Destination.findByIdAndDelete(
            req.params.id
        );


        return res.status(200).json({

            success:true,

            message:"Deleted Successfully"

        });

    } catch (error) {

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};