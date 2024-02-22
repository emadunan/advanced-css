import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

interface Pizza {
  id: number;
  imageUrl: string;
  ingredients: string[];
  name: string;
  soldOut: boolean;
  unitPrice: number;
}

function Menu() {
  const menu = useLoaderData() as Pizza[];
  console.log(menu);

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id}></MenuItem>
      ))}
    </ul>
  );
}

export async function loader(): Promise<Pizza[]> {
  const menu = await getMenu();

  return menu;
}

export default Menu;
