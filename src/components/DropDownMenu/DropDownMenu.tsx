import MenuItem, { MenuItemProps } from "./MenuItem";

interface DropDownMenuProps {
  links: MenuItemProps[];
}

export const DropDownMenu = ({ links }: DropDownMenuProps) => {
  return (
    <div className="font-inter absolute flex flex-row bg-white mt-0 py-2 left-0 right-0 w-full h-72 top-full shadow-lg rounded px-4 sm:px-6 md:px-8 lg:px-8 xl:px-50 2xl:px-56">
      <div className="w-28 mr-9 "></div>
      <div className="">
        <ul className=" mt-8 mb-8">
          {links.map(({ url, title }, i) => (
            <MenuItem key={`${title}-${i}`} title={title} url={url} />
          ))}
        </ul>
      </div>
    </div>
  );
};
