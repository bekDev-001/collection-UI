import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import collectionService from "../../services/collection";
import {useTranslation} from "react-i18next"

const ViewAllCollections = () => {
  const [allCollections, setAllCollections] = useState<any>([]);

  const navigate = useNavigate();
  const {t} = useTranslation()

  useEffect(() => {
    collectionService
      .getAllCollections()
      .then((res) => {
        setAllCollections(res.data.collections);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCollectionNavigate = (id: any) => {
    navigate("/viewCollection", { state: id });
  };

  return (
    <div className="p-6">
      <div className="text-black text-3xl font-semibold pb-3 dark:text-white">
        {t("view_all_collections_title")}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {allCollections.map((item: any, i: number) => (
          <div
            key={i}
            onClick={() => handleCollectionNavigate(item._id)}
            className="relative group overflow-hidden shadow-lg border border-transparent rounded-md dark:hover:border dark:hover:border-blue-500"
          >
            <img
              className="w-full h-[230px] bg-cover cursor-pointer rounded-md hover:scale-110 transition duration-300 ease-in-out"
              src={item.collectionImage}
              alt="Item"
            />
            <div className="absolute cursor-pointer bg-shown-black overflow-hidden bg-fixed bottom-0 w-full">
              <div className="flex flex-col">
                <div className="text-white font-bold font-mono pl-2 group-hover:text-blue-500">
                  {t("home_card_title")}: {item.title}
                </div>
                <div className="text-white font-bold font-mono pl-2 group-hover:text-blue-500">
                  {t("home_card_owner")}: {item.collection_owner[0].username}
                </div>
                <div className="text-white font-bold font-mono pl-2 group-hover:text-blue-500">
                  {t("home_card_elements")}: {item.collection_items_count}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllCollections;
