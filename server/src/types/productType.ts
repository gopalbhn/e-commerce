


export interface IProduct {
    name: string,
    description: string,
    price: number,
    stock: number,
    thumbnails: string,
    images: string[],
    oldPrice: number,
    discount: number,
    category: object,
    isDeleted: boolean,
    seller: object
    brand: object
    createdAt?: Date,
    updatedAt?: Date
}


export interface ICategory {
    name: string,
    parentCategory: string | null,

}

export interface IBrand {
    name: string,
    category: string | null
}
