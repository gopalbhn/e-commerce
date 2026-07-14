


export interface IProduct {
    name: string,
    description: string,
    price: number,
    stock: number,
    thumbnails: string,
    images: string[],
    oldPrice: number,
    discount: number,
    category: string,
    isDeleted: boolean,
    seller: object
}