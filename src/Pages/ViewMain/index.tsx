import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import moment from "moment";
import { Pagination, Navigation } from "swiper";
import { CgChevronRightO } from "react-icons/cg";
import { BsArrowRightShort } from "react-icons/bs";
import collectionService from "../../services/collection";
import { useTranslation } from "react-i18next";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

const ViewMain = () => {
  const [collectionData, setCollectionData] = useState([]);
  const [itemsData, setItemsnData] = useState([]);

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // get all collection sorted with top collection
    collectionService
      .getAllCollections()
      .then((res) => {
        setCollectionData(res.data.collections);
      })
      .catch((err) => {
        console.log(err);
      });
    // get all items sorted with recent
    collectionService
      .getAllItems()
      .then((res) => {
        setItemsnData(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCollectionNavigate = (id: any) => {
    navigate("/viewCollection", { state: id });
  };

  const handleItemNavigate = (id: any) => {
    navigate("/viewItem", { state: id });
  };

  
  return (
    <div className="p-20">
      <div className="w-full dark:bg-black">
        <div className="flex justify-between items-center pb-7">
          <div className="text-4xl font-bold dark:text-white">
            {t("home_largest_collection")}
          </div>
          <button
            onClick={() => navigate("/viewAllCollection")}
            className="flex items-center bg-blue-500 text-white border border-blue-500 rounded px-3 py-1 hover:bg-blue-400 hover:border-blue-400"
          >
            {t("home_card_viewAll")}
            <span className="text-2xl">
              <BsArrowRightShort />
            </span>
          </button>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          slidesPerGroup={1}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          breakpoints={{
            1024:{
               slidesPerView: 4,
            },
            1000:{
               slidesPerView: 3,
            },
            720:{
               slidesPerView: 2,
               centeredSlides: true,
            },
            100:{
               slidesPerView: 1,
               centeredSlides: true,
            }
          }}
          className="mySwiper"
        >
          {collectionData.map((item: any, i: number) => (
            <SwiperSlide key={i}>
              <div className="group bg-white border-2 border-gray-200 w-[275px] rounded-xl hover:border-blue-200 box-shadow-wrapper dark:border-black dark:hover:border-blue-500">
                <div className="relative overflow-hidden h-64 rounded-t-xl">
                  <img
                    src={item.collectionImage}
                    className="group-hover:scale-110 w-full h-full bg-cover object-cover bg-center bg-no-repeat transition duration-300 ease-in-out"
                    alt="Louvre"
                  />
                </div>
                <div className="flex flex-col gap-y-3 p-2 relative bg-blue-50 dark:bg-dark-mode-card">
                  <div className="absolute -top-10 left-24 flex flex-col items-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                      className="rounded-full w-16"
                      alt="Avatar"
                    />
                  </div>
                  <h5 className="text-xl text-center font-medium leading-tight mt-9 dark:text-white">
                    {item.collection_owner[0].username}
                  </h5>
                  <p className="text-gray-500 font-serif text-xs font-bold absolute right-2">
                    {moment(`${item.createdAt}`).format("ll")}
                  </p>
                  <div className="font-semibold font-body pt-8">
                    <span className="text-black dark:text-white">{t("home_card_title")}: </span>{" "}
                    <span className="text-gray-700 dark:text-slate-400">{item.title}</span>
                  </div>
                  <div className="font-semibold font-body">
                    <span className="text-black dark:text-white">{t("home_card_topic")}: </span>{" "}
                    <span className="text-gray-700 dark:text-slate-400">
                      {item.collectionTopic}
                    </span>
                  </div>
                  <div className="font-semibold font-body">
                    <span className="text-black dark:text-white">{t("home_card_elements")}: </span>{" "}
                    <span className="text-gray-700 dark:text-slate-400">
                      {item.collection_items_count}
                    </span>
                  </div>
                  <div
                    onClick={() => handleCollectionNavigate(item._id)}
                    className="flex items-center gap-2 text-blue-500 px-2 py-3 cursor-pointer"
                  >
                    <span className="text-xl">
                      <CgChevronRightO />
                    </span>
                    <span className="font-medium font-body border-b border-blue-500">
                     {t("home_card_more")}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="pt-32">
        <div className="w-full">
          <div className="flex pb-7">
            <div className="text-4xl font-bold dark:text-white">{t("home_recent_items")}</div>
          </div>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            breakpoints={{
            1024:{
               slidesPerView: 4,
            },
            1000:{
               slidesPerView: 3,
            },
            720:{
               slidesPerView: 2,
            },
            100:{
               slidesPerView: 1,
              centeredSlides:true,
               
            }
          }}
            className="mySwiper"
          >
            {itemsData.map((item: any, i: number) => (
              <SwiperSlide key={i}>
                <div className="group bg-white border-2 border-gray-200 w-[280px] rounded-xl hover:border-blue-200 box-shadow-wrapper dark:border-black dark:hover:border-blue-500">
                  <div className="relative overflow-hidden h-64 rounded-t-xl">
                    <img
                      src={item.itemImage}
                      className="group-hover:scale-110 w-full h-full bg-cover object-cover bg-center bg-no-repeat transition duration-300 ease-in-out"
                      alt="Louvre"
                    />
                  </div>
                  <div className="flex flex-col gap-y-3 p-2 relative bg-blue-50 dark:bg-dark-mode-card">
                    <p className="text-gray-500 font-serif text-xs font-bold absolute right-2">
                      {moment(`${item.createdAt}`).format("ll")}
                    </p>
                    <div className="font-semibold font-body">
                      <span className="text-black dark:text-white">{t("home_card_title")}: </span>{" "}
                      <span className="text-gray-700 dark:text-slate-400">{item.itemTitle}</span>
                    </div>
                    <div className="font-semibold font-body">
                      <span className="text-black dark:text-white">{t("home_card_owner")}: </span>{" "}
                      <span className="text-gray-700 dark:text-slate-400">
                        {item.item_owner.username}
                      </span>
                    </div>
                    <div className="font-semibold font-body">
                      <span className="text-black dark:text-white border-b border-blue-500">
                        {t("home_card_topic")}:{" "}
                      </span>{" "}
                      <span className="text-gray-700 dark:text-slate-400">
                        {item.itemCollection.collectionTopic}
                      </span>
                    </div>
                    <div className="font-semibold font-body">
                      <span className="text-black dark:text-white">Tag: </span>{" "}
                      <span className="text-gray-700 dark:text-slate-400">{item.itemTag}</span>
                    </div>
                    <div className="font-semibold font-body">
                      <span className="text-black dark:text-white">{t("home_card_comments")}: </span>{" "}
                      <span className="text-gray-700 dark:text-slate-400">
                        {item.comments?.length || 0}
                      </span>
                    </div>
                    <div className="font-semibold font-body">
                      <span className="text-black dark:text-white">Likes: </span>{" "}
                      <span className="text-gray-700 dark:text-slate-400">
                        {item.likes?.length || 0}
                      </span>
                    </div>
                    <div
                      onClick={() => handleItemNavigate(item._id)}
                      className="flex items-center gap-2 text-blue-500 px-2 py-3 cursor-pointer"
                    >
                      <span className="text-xl">
                        <CgChevronRightO />
                      </span>
                      <span className="font-medium font-body border-b border-blue-500">
                        {t("home_card_more")}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ViewMain;
