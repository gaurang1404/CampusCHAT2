import { CourseFaculty } from "../models/courseFaculty.model.js";

export const getMapping = async (req, res) => {
    try {
        const {sectionId} = req.params;

        console.log(sectionId);
        

        const mapping = await CourseFaculty.find({sectionId}).populate([
            {
                path: "courseId"
            },
            {
                path: "facultyId"
            }
        ]);

        console.log(mapping);
        

        return res.status(200).json({
            message: "Fetched mapping successfully",
            mapping,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later!",
            success: false,
        });
    }
};