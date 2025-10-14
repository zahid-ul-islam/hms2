import {
  // Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import DashboardMain from "../Pages/dashboardPage/DashboardMain";
import BasePage from "../BasePage";
import AboutMain from "../Pages/aboutPage/AboutMain";
import ServiceCategoryPage from "../Pages/serviceCategoryPage/ServiceCategoryPage";
import ProductPage from "../Pages/productPage/ProductPage";
import OrdersMain from "../Pages/ordersPage/OrdersMain";

// const secureRouteWrapper = (element: ReactElement): ReactElement => (
//   <SecureRoute>{element}</SecureRoute>
// );

export function AppRoutes() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <BasePage />,
      children: [
        {
          index: true, // Default route for "/"
          element: <DashboardMain />, // Or any other default page
        },
        {
          path: "/services",
          element: <DashboardMain />,
        },
        {
          path: "/about",
          element: <AboutMain />,
        },
        {
          path: "/:serviceLink",
          element: <ServiceCategoryPage />,
        },
        {
          path: "/categories/:categoryId/services/:serviceId/products",
          element: <ProductPage />,
        },
        {
          path: "/orders",
          element: <OrdersMain />,
        }
      ],
    }
  ]);
  return <RouterProvider router={routes} />;
}
