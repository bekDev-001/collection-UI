import React, {useState, useEffect, useCallback} from 'react'
import { io } from "socket.io-client"
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import collectionService from '../../services/collection';
import SubmitButton from '../../Components/SubmitButton';
import {useTranslation} from "react-i18next"
import moment from "moment";


const ViewItem = () => {
const [data, setData] = useState<any>({});
const [otherItems, setOtherItems] = useState<any>([]);
const [otherItemsId, setOtherItemsID] = useState<any>("");
const [render, setRender] = useState<any>(true);
const [commentInput, setCommentInput] = useState("");
const [commentData, setCommentData] = useState<any>("");

  const { state } = useLocation();
  const navigate = useNavigate();
  const {t} = useTranslation();

const socket = io("https://taskapp004.herokuapp.com", {
  auth: {
    token: `${localStorage.getItem("token")}`
  }
})

  

useEffect(() => {
    if(state) {
        collectionService.getOneItemId(state).then((res: any) => {
            setData(res.data.item);
            setOtherItemsID(res.data.item?.itemCollection?._id)
            console.log("DATTATAT",res.data.item);
        }).catch((err) => {
            console.log(err);
        })
    }
}, [render])

useEffect(() => {
  if(data?.itemCollection?._id){
    collectionService.getOneCollectionId(data?.itemCollection?._id).then((res) => {
        // console.log(res.data?.collections[0]?.collection_items);
        setOtherItems(res.data?.collections[0]?.collection_items)
    }).catch((err) => {
        console.log(err);
    })
  }
}, [otherItemsId])

 const handleItemNavigate = (id: any) => {
    navigate("/viewItem", { state: id });
    setRender(!render)
  };


const postComment = () => {
  // console.log(commentData);
  setCommentInput("")
  socket.emit("item:comment", { item_id: data._id, comment: commentInput }, (result:any, error:any) => {
    setCommentInput("")
    console.log(result)
    console.log(error)
  })
}
console.log(commentInput);


// const postComment = useCallback(function() {
//   console.log(commentInput);
  
//   socket.emit("item:comment", { item_id: data._id, comment: commentInput }, (result:any, error:any) => {
//     console.log(result)
//     console.log(error)
//   })
// }, [])

useEffect(() => {
  socket.on("comment:received", (result) => {
    setCommentData(result.comments);
    console.log(result)
  })
  console.log("Id changed");
  
}, [])



 const like = () => {
    socket.emit("item:like", data._id, (result:any, err:any) => {
      console.log(result)
      console.log(err)
    })
  }
  function unlike() {
    socket.emit("item:dislike", "630dd1b10c95b44236d4a48f", (result:any, err:any) => {
      console.log(result)
      console.log(err)
    })
  }
  console.log("comment Data:",commentData);
  

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
          <div>
            <div onClick={like} className="btn" id="green"><span><AiFillLike /></span>Like</div>
            <div className="btn" id="red"><span><AiFillDislike /> Dislike</span></div>
          </div>
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
                        {t("creted_tiem")}: </span>
                    <span className="text-black font-mono font-medium dark:text-slate-300">
                      {moment(`${data?.createdAt}`).format(
                        "llll"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-black font-bold dark:text-white">{t("home_card_title")}: </span>
                    <span className="text-black font-mono font-medium dark:text-slate-300">
                      {data?.itemTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-black font-bold dark:text-white">Tag: </span>
                    <span className="text-black font-mono font-medium dark:text-slate-300">
                      {data?.itemTag}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-black font-bold dark:text-white">{t("add_colletion_description")}: </span>
                    <span className="text-black font-mono font-medium dark:text-slate-300">
                      {data?.description}
                    </span>
                  </div>
                  {/* commmmmmmmmmmmmmmmmmmmmmmmmmm */}
                  <hr />
                  <div className='pt-4'>
                    <div className='flex flex-col gap-2'>
                    <input className='border-b border-black focus:border-blue-500 focus:border-b outline-none rounded-sm px-2 py-1' onChange={(e) => setCommentInput(e.target.value)}  placeholder={t("add_comment")} type="text" />
                    <div className='w-20 self-end'>
                        <SubmitButton title='Comment' onClick={() => postComment()}  />
                    </div>
                    </div>
                    <div>
                        <div className='flex gap-4 pb-4'>
                            <div className='font-bold dark:text-white'>{t("add_comment_title")}</div>
                            <div className='font-medium cursor-pointer border-b dark:text-slate-300 border-blue-500'>{t("show_more")}</div>
                        </div>
                        <div className='flex flex-col gap-4 overflow-auto max-h-[450px]'>
                            {commentData?.length > 0 ? 
                            commentData.map((item:any, i:number) => (
                            <div key={i} className="flex gap-2">
                              <div>
                                <img
                                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                  className="rounded-full w-10"
                                  alt="Avatar"
                                />
                              </div>
                              <div className='flex flex-col gap-1'>
                                <div className='flex gap-2'>
                                  {localStorage.getItem("userId") === item.comment_owner._id ? 
                                   <div className='text-sm dark:text-white font-semibold text-blue-500 border-b border-black'>You</div>
                                   : 
                                   <div className='text-sm font-semibold'>{item.comment_owner.username}</div>
                                }
                                <div className='text-sm text-gray-500'>{moment(`${item.createdAt}`).format("ll")}</div>
                                </div>
                                <div className='text-sm dark:text-slate-300'>{item.comment}</div>
                              </div>
                            </div>
                           )) : <div className='dark:text-slate-200'>{t("no_commnets_yet") }</div>
                        }
                           
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
                    onClick={() => handleItemNavigate(item._id)}
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
                          {t("home_card_title")}: {item.itemTitle}
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

  )
}

export default ViewItem