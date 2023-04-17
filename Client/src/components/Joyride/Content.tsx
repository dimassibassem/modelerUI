import React from "react";
import { useTranslation } from "react-i18next";
import capitalize from "@/utils/capitalize";

const Content = ({ list, Icon, Definition }
                   : {
                   list: string[],
                   Icon: React.FC<{ type: string }>,
                   Definition: React.FC<{ type: string}>
                 }
) => {
  const { t } = useTranslation();
  return (
    <ul className="mt-3 grid grid-cols-1 gap-2 ">
      {list.map((item) => (
        <li
          key={item}
          className="col-span-1 flex rounded-md shadow-md"
        >
          <div className="flex-shrink-0 p-2 flex items-center justify-center">
            <Icon type={item} />
          </div>
          <div className=" flex border-gray-200 ">
            <div className=" px-1 py-2 text-sm ">
              <p className="font-medium text-gray-900 ">
                {capitalize(t(item))}:
                <Definition type={item} />
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Content;
