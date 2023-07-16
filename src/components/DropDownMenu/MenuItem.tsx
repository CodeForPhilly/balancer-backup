import { NavLink } from "react-router-dom";

export type MenuItemProps = { url: string; title: string };

function MenuItem({ url, title }: MenuItemProps) {
  return (
    <li className="mb-8">
      <NavLink
        to={url}
        className=" text-black hover:text-black hover:no-underline hover:border-b-2 hover:border-blue-600">
        {title}
      </NavLink>
    </li>
  );
}

export default MenuItem;
