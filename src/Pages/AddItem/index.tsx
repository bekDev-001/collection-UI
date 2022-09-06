import React, { useState, useEffect } from "react";
import {useNavigate, useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadingMode } from "../../redux/reducers/loadingReducer";
import ImageUploadInput from "../../Components/ImageUploadInput";
import Input from "../../Components/Input";
import SelectInput from "../../Components/SelectInput";
import collectionService from "../../services/collection";
import SubmitButton from "../../Components/SubmitButton";
import { useTranslation } from "react-i18next";
import {tagOptions} from "./helper"
import { toast } from "react-toastify";

const AddItem = () => {
  const [image, setImage] = useState("");
  const [imageShow, setImageShow] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescripton] = useState("");
  const [collectionId, setCollectionId] = useState("");

  const [collectionData, setCollectionData] = useState("");

  const dispatch = useDispatch();
  const {state} = useLocation();
  const navigate = useNavigate();  
  const { t } = useTranslation();

  console.log(state);

    useEffect(() => {
    if(state) {
       collectionService.getOneItemId(state).then((res) => {
          console.log("One item get:",res);
          setTitle(res.data.item.itemTitle)
          setTag(res.data.item.itemTag)
          setDescripton(res.data.item.description)
          setImageShow(res.data.item.itemImage)
          setImage(res.data.item.itemImage)
          setCollectionId(res.data.item.itemCollection._id)
        }).catch((err) => {
          console.log(err);
        })
   }
  }, [])
  

  const imageHandler = (event: any) => {
    if (event.target.files["0"]) {
      const image = URL.createObjectURL(event.target.files["0"]);
      setImage(event.target.files["0"]);
      setImageShow(image);
    } else {
      setImage("");
    }
  };

  const handleSubmit = () => {
    dispatch(loadingMode(true));
    const itemData = new FormData();
    itemData.append("itemTitle", title);
    itemData.append("itemTag", tag);
    itemData.append("description", description);
    itemData.append("itemImage", image);
    if(state) {
      collectionService.editItem(itemData, state).then((res) => {
        console.log(res);
        dispatch(loadingMode(false));
           if (res.status === 200) {
          toast.success("Edit successfully!", {
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
          dispatch(loadingMode(false));
        toast.error(err?.response.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        })

    } else {
      collectionService
        .addItem(itemData, collectionId)
        .then((res) => {
          dispatch(loadingMode(false));
          if (res.status === 200) {
            toast.success(res?.data?.message, {
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
          console.log(res);
        })
        .catch((err) => {
          dispatch(loadingMode(false));
          toast.error(err?.response.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  };

  useEffect(() => {
   collectionService.getUserOwnCollections()
   .then((res) => {
    console.log(res)
    const data = res.data.collections.map((item: any) => ({
      value: item._id,
      label: item.collectionTopic
    }))
    setCollectionData(data)
  })
   .catch((err) => {
    console.log(err);
   })
  }, [])
  console.log(collectionData);
  
  

  return (
    <div className="bg-gray-100 dark:bg-black min-h-screen">
      <form className="p-6" action="POST">
        <div className="font-bold main-text-color xl:text-2xl md:text-xl py-4 dark:text-white">
        {t("add_item_title")}
        </div>
        <div className="bg-white dark:bg-dark-mode-card flex flex-col 2xl:flex-row md:flex-row sm:flex-col gap-32 box-shadow-wrapper rounded p-6">
          <div className="w-full md:w-96">
            <ImageUploadInput image={imageShow} onChange={imageHandler} />
          </div>
          <div className="flex flex-col gap-6 w-full md:w-1/3 sm:w-full">
            <Input
              type="text"
              label={t("home_card_title")}
              name="title"
              placeholder="Enter title"
              isRequired={true}
              disabled={false}
              value={title}
              onChange={(event: any) => setTitle(event.target.value)}
            />
                <SelectInput
                isRequired={true}
                title={t("home_card_collection")}
                options={collectionData}
                placeholder="Select a collection"
                name="collection"
                onChange={(value: any) =>setCollectionId(value.value)}
                value={collectionId}
                 />
            <SelectInput
                isRequired={true}
                title="Tag"
                options={tagOptions}
                placeholder="Select a tag"
                name="tag"
                onChange={(value: any) =>setTag(value.value)}
                value={tag}
            />
            <Input
              type="text"
              label={t("add_colletion_description")}
              name="description"
              placeholder="Enter description"
              isRequired={false}
              disabled={false}
              value={description}
              onChange={(event: any) => setDescripton(event.target.value)}
            />
            <div className="w-full pt-5">
              <SubmitButton title={t("submit")} onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
