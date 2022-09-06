import React, { useState, useEffect } from "react";
import {useNavigate, useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadingMode } from "../../redux/reducers/loadingReducer";
import ImageUploadInput from "../../Components/ImageUploadInput";
import Input from "../../Components/Input";
import collectionService from "../../services/collection";
import SubmitButton from "../../Components/SubmitButton";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AddCollection = () => {
  const [image, setImage] = useState("");
  const [imageShow, setImageShow] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescripton] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state} = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
   if(state) {
     collectionService.getOneCollectionId(state).then((res) => {
          console.log(res);
          setTitle(res.data.collections[0].title)
          setTopic(res.data.collections[0].collectionTopic)
          setDescripton(res.data.collections[0].description)
          setImageShow(res.data.collections[0].collectionImage)
          setImage(res.data.collections[0].collectionImage)
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

  console.log(image);

  const handleSubmit = () => {
    dispatch(loadingMode(true));
    const collectionData = new FormData();
    collectionData.append("title", title);
    collectionData.append("collectionTopic", topic);
    collectionData.append("description", description);
    collectionData.append("collectionImage", image);
    if(state) {
        collectionService.editCollection(collectionData, state).then((res) => {
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
      .addCollection(collectionData)
      .then((res) => {
        dispatch(loadingMode(false));
        if (res.status === 200) {
          toast.success("Successfully Created!", {
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
console.log(state);

  return (
    <div className="bg-gray-100 dark:bg-black min-h-screen">
      <form className="p-6" action="POST">
        <div className="font-bold main-text-color xl:text-2xl md:text-xl py-4 dark:text-white">
          {t("add_colletion_title")}
        </div>
        <div className="bg-white dark:bg-dark-mode-card flex flex-col 2xl:flex-row md:flex-row sm:flex-col gap-8 lg:gap-20 md:gap-10 box-shadow-wrapper rounded p-6">
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
            <Input
              type="text"
              label={t("home_card_topic")}
              name="topic"
              placeholder="Enter topic"
              isRequired={true}
              disabled={false}
              value={topic}
              onChange={(event: any) => setTopic(event.target.value)}
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

export default AddCollection;
