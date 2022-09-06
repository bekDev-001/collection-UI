import React, { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import collectionService from "../../services/collection";
import SubmitButton from "../../Components/SubmitButton";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { toast } from "react-toastify";

const ViewItem = () => {
  const [data, setData] = useState<any>({});
  const [otherItems, setOtherItems] = useState<any>([]);
  const [otherItemsId, setOtherItemsID] = useState<any>("");
  const [render, setRender] = useState<any>(true);
  const [commentInput, setCommentInput] = useState<any>("");
  const [commentData, setCommentData] = useState<any>("");
  const [likes, setLikes] = useState<any>({});
  const [isLiked, setIdLiked] = useState<any>(false);

  const { state } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");

  const socket = io("https://taskapp004.herokuapp.com", {
    auth: {
      token: `${localStorage.getItem("token")}`,
    },
  });
  const handleItemNavigate = (id: any) => {
    navigate("/viewItem", { state: id });
    setRender(!render);
  };

  useEffect(() => {
    if (state) {
      collectionService
        .getOneItemId(state)
        .then((res: any) => {
          setData(res.data.item);
          setOtherItemsID(res.data.item?.itemCollection?._id);
          console.log("DATTATAT", res.data.item);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [render]);

  useEffect(() => {
    if (data?.itemCollection?._id) {
      collectionService
        .getOneCollectionId(data?.itemCollection?._id)
        .then((res) => {
          // console.log(res.data?.collections[0]?.collection_items);
          setOtherItems(res.data?.collections[0]?.collection_items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [otherItemsId]);

  const postComment = () => {
    socket.emit(
      "item:comment",
      { item_id: data._id, comment: commentInput },
      (result: any, error: any) => {
        console.log(result);
        console.log(error);
        setCommentInput("");
        socket.emit("comment:all", data?._id, (result: any, error: any) => {
          setCommentData(result.comments);
        });
      }
    );
  };

  useEffect(() => {
    socket.emit("comment:all", data?._id, (result: any, error: any) => {
      setCommentData(result.comments);
    });
    // like item
    socket.emit("likes:all", data?._id, (result: any, error: any) => {
      console.log(result);
      setLikes(result.likes);
      setIdLiked(result.likes.includes(userId));
      // console.log(error)
    });
  }, [state, render, otherItemsId]);

  const like = () => {
    socket.emit("item:like", data._id, (result: any, err: any) => {
      // console.log(result);
      // console.log(err);
      socket.emit("likes:all", data?._id, (result: any, error: any) => {
        console.log(result);
        setIdLiked(result.likes.includes(userId));
        setLikes(result.likes);
        // console.log(error)
      });
    });
  };
  function unlike() {
    socket.emit("item:dislike", data._id, (result: any, err: any) => {
      console.log(result);
      console.log(err);
    });
  }

  const handleEditNavigation = () => {
    navigate("/addItem", { state: data?._id });
  };
  const handleDelete = () => {
    collectionService
      .delItem(state)
      .then((res) => {
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
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="pt-8 p-8">
      <div className="flex justify-between">
        <div className="text-4xl inline-flex font-bold border-b-2 border-blue-500 dark:text-white">
          {t("item_one")}
        </div>
        <div className="text-black font-bold text-3xl text-center border-b-2 border-blue-500 dark:text-white">
          {t("item_one_other")}
        </div>
      </div>
      <div className="flex justify-between pt-5">
        <div className="flex flex-col w-1/2">
          <div className="w-full">
            <img
              className="w-full rounded-md h-[400px] hover:scale-105 transition duration-300 ease-in-out"
              src={data?.itemImage}
              alt="Image"
            />
          </div>
          {/* likeeeeeeeeeeeeeeee */}
          {userId ? (
            <div className="flex items-center gap-3 pt-3">
              <div
                onClick={like}
                className="group cursor-pointer text-lg bg-slate-300 border rounded inline-flex items-center gap-3 px-4 py-1 "
                id="green"
              >
                <span>{likes?.length || 0}</span>
                <div
                  className={
                    isLiked
                      ? "flex items-center text-red-500 gap-2 group-hover:text-red-500 transition-all"
                      : "flex items-center gap-2 group-hover:text-red-500 transition-all"
                  }
                >
                  <span className="text-xl">
                    <AiFillLike />
                  </span>
                </div>
              </div>
              {/* <div
                onClick={unlike}
                className="group cursor-pointer text-lg bg-slate-300 border rounded inline-flex items-center gap-3 px-4 py-1 "
                id="green"
              >
                <span>0</span>
                <div className="flex items-center gap-2 group-hover:text-red-500 transition-all">
                  <span className="text-xl">
                    <AiFillDislike />
                  </span>
                </div>
              </div> */}
            </div>
          ) : (
            ""
          )}
          {userId ? (
            <div className="w-full flex items-center gap-4 pt-3">
              <button
                onClick={handleEditNavigation}
                type="button"
                className="inline-flex px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                type="button"
                className="inline-flex px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Delete
              </button>
            </div>
          ) : (
            ""
          )}
          {/* likeeeeeeeeeeeeeeee */}
          <div className="flex flex-col">
            <div className="pt-3">
              <div className="flex flex-col gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-black font-bold dark:text-white">
                    {t("item_owner")}:{" "}
                  </span>
                  <span className="text-black font-mono font-medium dark:text-slate-300">
                    {data.item_owner?.username}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-black font-bold dark:text-white">
                    {t("creted_tiem")}:{" "}
                  </span>
                  <span className="text-black font-mono font-medium dark:text-slate-300">
                    {moment(`${data?.createdAt}`).format("llll")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-black font-bold dark:text-white">
                    {t("home_card_title")}:{" "}
                  </span>
                  <span className="text-black font-mono font-medium dark:text-slate-300">
                    {data?.itemTitle}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-black font-bold dark:text-white">
                    Tag:{" "}
                  </span>
                  <span className="text-black font-mono font-medium dark:text-slate-300">
                    {data?.itemTag}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-black font-bold dark:text-white">
                    {t("add_colletion_description")}:{" "}
                  </span>
                  <span className="text-black font-mono font-medium dark:text-slate-300">
                    {data?.description}
                  </span>
                </div>
                {/* commmmmmmmmmmmmmmmmmmmmmmmmmm */}
                <hr />
                <div className="pt-4">
                  <div className="flex flex-col gap-2">
                    <input
                      name="comment"
                      className="border-b border-black focus:border-blue-500 focus:border-b outline-none rounded-sm px-2 py-1"
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder={t("add_comment")}
                      value={commentInput}
                      type="text"
                    />
                    <div className="w-20 self-end">
                      <SubmitButton
                        title="Comment"
                        onClick={() => postComment()}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-4 pb-4">
                      <div className="font-bold dark:text-white">
                        {t("add_comment_title")}
                      </div>
                      <div className="font-medium cursor-pointer border-b dark:text-slate-300 border-blue-500">
                        {t("show_more")}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 overflow-auto max-h-[450px]">
                      {commentData?.length > 0 ? (
                        commentData.map((item: any, i: number) => (
                          <div key={i} className="flex gap-2">
                            <div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                className="rounded-full w-10"
                                alt="Avatar"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="flex gap-2">
                                {localStorage.getItem("userId") ===
                                item.comment_owner?._id ? (
                                  <div className="text-sm dark:text-white font-semibold text-blue-500 border-b border-black">
                                    You
                                  </div>
                                ) : (
                                  <div className="text-sm font-semibold">
                                    {item.comment_owner?.username}
                                  </div>
                                )}
                                <div className="text-sm text-gray-500">
                                  {moment(`${item?.createdAt}`).format("ll")}
                                </div>
                              </div>
                              <div className="text-sm dark:text-slate-300">
                                {item?.comment}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="dark:text-slate-200">
                          {t("no_commnets_yet")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* commmmmmmmmmmmmmmmmmmmmmmmmmm */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="overflow-x-auto h-[700px]">
            {/* {data.map((item: any, i: number) => ( */}
            <div className="w-96 h-72 flex flex-col gap-10">
              {otherItems.map((item: any, i: number) => (
                <div
                  key={i}
                  onClick={() => handleItemNavigate(item?._id)}
                  className="relative group border rounded-md border-transparent dark:hover:border-blue-500"
                >
                  <img
                    className="w-full h-[200px] bg-cover cursor-pointer rounded-md"
                    src={item.itemImage}
                    alt="Item"
                  />
                  <div className="absolute bg-shown-black overflow-hidden bg-fixed bottom-0 w-full">
                    <div className="">
                      <div className="text-white font-bold font-mono py-3 pl-2 group-hover:text-blue-500">
                        {t("home_card_title")}: {item?.itemTitle}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* ))}  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewItem;
