import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import collectionService from "../../services/collection";
import { useTranslation } from "react-i18next";

const UserOwnCollections = () => {
    const [userCollections, setUserCollections] = useState<any>([]);

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    collectionService
      .getUserOwnCollections()
      .then((res) => {
        setUserCollections(res.data.collections);
        console.log(res.data.collections);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCollectionNavigate = (id: any) => {
    navigate("/viewCollection", { state: id });
  };
  return (
    <div className='p-6'>
        <div className='text-black dark:text-white text-2xl md:text-3xl inline-flex font-semibold pt-3 mb-5 border-b-2 border-b-blue-500'>{t("user_ownCollection_title")}</div>
        <div className='grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-3'>
           {userCollections ? 
           userCollections.map((item:any, i: number) => (
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
                          {t("home_card_topic")}: {item.collectionTopic}
                        </div>
                        <div className="text-white font-bold font-mono pl-2 group-hover:text-blue-500">
                          {t("home_card_elements")}: {item.collection_items.length || 0}
                        </div>
                      </div>
                    </div>
                  </div>
            )) : <div>NO collections yet</div>
          }
        </div>
    </div>
  )
}

export default UserOwnCollections