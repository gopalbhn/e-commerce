export interface userPieChartDataType {
    value: number,
    name: string,
    color: string
}


export interface DashboardStats {
    userWeeklyCounts: {
        week1: number;
        week2: number;
        week3: number;
        week4: number;
    };
    productsWeeklyCount: {
        week1: number;
        week2: number;
        week3: number;
        week4: number;
    };
    orderWeeklyCounts: {
        week1: number;
        week2: number;
        week3: number;
        week4: number;
    };
    seller: number;
    customer: number;
}

export interface SellerRequest {
    userId: {
        _id: string,
        name: string,
        email: string,
    },
    shopName: string,
    storeType: string,
    createdAt: Date
}