import React from 'react'
import {BiSearch} from "react-icons/bi";
import {useTranslation} from "react-i18next"

const SearchInput = () => {
  const {t} = useTranslation();
  return (
    <div className='relative flex items-center'>
        <span className='absolute main-text-color text-2xl pl-3'><BiSearch /></span>
        <input type="search" name="serch" placeholder={t("search")} className="bg-slate-100 h-12 pl-10 pr-5 w-[300px] rounded-md text-base border main-text-color main-text-color-border focus:outline-none placeholder:main-text-color" />
    </div>
  )
}

export default SearchInput;