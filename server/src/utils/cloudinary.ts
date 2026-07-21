import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})
// const uploadToCloudinary = async (filePath) => {


//     try {
//         console.log("filePath", filePath);
//         const image = await cloudinary.uploader.upload_stream(filePath, { resource_type: "image" });
//         return image
//     } catch (err) {
//         console.log("Error Occured while uploading file to Cloudinary", err);
//         throw err;
//     }

// }



const uploadToCloudinary = async (filePath: any) => {


    try {
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream((error, uploadResult) => {
                if (error) {
                    return reject(error);
                }
                return resolve(uploadResult);
            }).end(filePath);
        });
        return uploadResult
    } catch (err) {
        console.log("Error Occured while uploading file to Cloudinary", err);
        throw err;
    }

}

async function deleteFromCloudinary(publicId: string): Promise<boolean> {
    try {
        const res = await cloudinary.uploader.destroy(publicId, { resource_type: "image" })
        console.log(res)

        return res?.result === "ok" || res?.result === "deleted"
    } catch (err) {
        console.log("Error:", err)
        return false
    }
}
export { uploadToCloudinary, deleteFromCloudinary };