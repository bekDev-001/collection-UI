import React, { useState, useEffect } from "react";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import collectionService from "../../services/collection";
import {useTranslation} from "react-i18next"
import { toast } from "react-toastify";

const ViewCollection = () => {
  const [data, setData] = useState([]);
  const [collectionId, setCollectionId] = useState("");

  const userId = localStorage.getItem("userId");

  const { state } = useLocation();
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    if (state) {
      collectionService
        .getOneCollectionId(state)
        .then((res) => {
          setData(res.data.collections);
          console.log(res.data.collections);
          setCollectionId(res.data.collections[0]._id)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleItemNavigate = (id: any) => {
    navigate("/viewItem", { state: id });
  };
 
  const handleEditNavigation = () => {
    navigate("/addCollection", { state: collectionId });
  };
  const handleDelete = () => {
    collectionService.delCollection(state).then((res) => {
      console.log(res);
       if (res.status === 200) {
          toast.success("Delete Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // 
          navigate("/")
        }
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <div className="pt-8 p-8">
      <div className="flex justify-between">
        <div className="text-4xl inline-flex dark:text-white font-bold border-b-2 border-blue-500">
          {t("home_card_collection")}
        </div>
        <div className="text-black font-bold dark:text-white text-3xl hidden sm:block text-center border-b-2 border-blue-500">
          {t("item_of_collection")}
        </div>
      </div>
      <div className="flex flex-col md:flex-row sm:flex-col justify-between pt-5">
        <div className="flex flex-col w-full  md:w-1/2">
          <div className="w-full">
            {data.map((item: any, i: number) => (
              <img
                key={i}
                className="rounded-md bg-cover w-full h-[400px] bg-center hover:scale-105 transition duration-300 ease-in-out"
                src={item.collectionImage}
                alt="Image"
              />
            ))}
            {userId ? 
            <div className="w-full flex items-center gap-4 pt-3">
              <button onClick={handleEditNavigation} type="button" className="inline-flex px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Edit</button>
            <button onClick={handleDelete} type="button" className="inline-flex px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Delete</button>
            </div> : ""
            }
          </div>
          <div className="flex flex-col">
            {data.map((item: any, i: any) => (
              <div className="pt-3" key={i}>
                <div className="flex flex-col gap-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-black font-bold dark:text-white">
                      {t("collection_owner")}:{" "}
                    </span>
                    <span className="text-black font-mono font-medium dark:text-slate-300">
                      {item.collection_owner.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-black font-bold dark:text-white">{t("last_ction")}: </span>
                    <span className="text-black font-mono font-medium dark:text-slate-300">
                      {moment(`${item.collection_owner.lastLogin}`).format(
                        "llll"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-black font-bold dark:text-white">{t("home_card_title")}: </span>
                    <span className="text-black font-mono font-medium dark:text-slate-300">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-black font-bold dark:text-white">Topic: </span>
                    <span className="text-black font-mono font-medium dark:text-slate-300">
                      {item.collectionTopic}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-black font-bold dark:text-white">{t("add_colletion_description")}: </span>
                    <span className="text-black font-mono font-medium dark:text-slate-300">
                      {item.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <div className="text-black font-bold dark:text-white py-4 block sm:hidden text-3xl text-center border-b-2 border-blue-500">
           {t("item_of_collection")}
           </div>
          <div className="overflow-x-auto h-[500px]">
            {data.map((item: any, i: number) => (
              <div key={i} className="w-full 2xl:w-[520px] xl:w-96 md:w-80 sm:[50px] h-72 flex flex-col gap-10">
                {item.collection_items?.length > 0 ? 
                item.collection_items.map((item: any, i: number) => (
                  <div
                  key={i}
                    onClick={() => handleItemNavigate(item._id)}
                    className="relative group border rounded-md border-transparent dark:hover:border-blue-500"
                  >
                    <img
                      className="w-full h-[200px] bg-cover cursor-pointer rounded-md"
                      src={item.itemImage}
                      alt="Item"
                    />
                    <div className="absolute cursor-pointer bg-shown-black overflow-hidden bg-fixed bottom-0 w-full">
                      <div className="">
                        <div className="text-white font-bold font-mono py-3 pl-2 group-hover:text-blue-500">
                          {t("home_card_title")}: {item.itemTitle}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : <div className="dark:text-slate-300">{t("no_items_yet")}!</div>
              }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCollection;
