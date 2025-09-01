interface IRoomservice{
    title: string;
      icon: React.ReactNode;
      coverImage: string;
      description: string;
      slug:string;
}
 interface IFoodService {
    id: string;
    title: string;
    icon: React.ReactNode;
    coverImage: string;
    description: string;
    price: number;
    category: string;
    categoryId: string;
}

interface FoodServiceSliderProps {
    id:string;
    title: string;
    coverImage: string;
}

export type {
    IRoomservice,
    IFoodService,
    FoodServiceSliderProps
}