export interface userPieChartDataType {
    value: number,
    name: string,
    color: string
}


export interface DashboardStats {
    userWeeklyCounts: {
        "Week 1": number;
        "Week 2": number;
        "Week 3": number;
        "Week 4": number;
    };
    productsWeeklyCount: {
        "Week 1": number;
        "Week 2": number;
        "Week 3": number;
        "Week 4": number;
    };
    orderWeeklyCounts: {
        "Week 1": number;
        "Week 2": number;
        "Week 3": number;
        "Week 4": number;
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