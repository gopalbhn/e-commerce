import z from "zod";



const createSaleSchema = z.object({
    discountPercentage: z.number().int().min(1).max(100),
    saleTitle: z.string().min(1),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
})

export default createSaleSchema
