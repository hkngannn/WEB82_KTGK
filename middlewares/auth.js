import { getApiKey } from "../models/sessions.models.js";

const authMiddleware = {
    authentication: async (req, res, next) => {

        const {apiKey} = req.query
        try {
            if(!apiKey) throw new Error("apiKey is required")
            const getExistKey = await getApiKey({apiKey})
            if(!getExistKey) throw new Error("invalid apiKey") 
            const verifyApiKey = apiKey.split("-")

            const checkStr = verifyApiKey[3] === getExistKey.apiKey.split("-")[3]
            if(!checkStr) throw new Error("Unauthorized")
            const data = {
                userId: verifyApiKey[1],
                email: verifyApiKey[2],
            }
            req.data = data
            next()


        } catch (error) {
            res.status(401).send({
                message: error.message
            })
        }

    },


};
export default authMiddleware;