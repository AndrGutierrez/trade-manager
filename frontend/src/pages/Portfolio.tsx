import React, { useState, useEffect, MouseEventHandler } from "react";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import Button from "components/utils/Button";
import axios, { AxiosRequestConfig } from "axios";
import { OptionsOrGroups } from "react-select";
import { updatePortfolio } from "slices/portfolio";

type ItemProps = {
  label: string;
  id: number;
  value: string;
  logo: string;
  weburl: string;
};

export default function Portfolio() {
  const portfolio = useSelector((state: RootState) => state.portfolio);
  const [portfolioHasItems, setPortfolioHasItems] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const COMPANIES_PATH = `${process.env.REACT_APP_API_PATH}`;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (Object.keys(portfolio).length !== 0) setPortfolioHasItems(true);
  }, [portfolio]);

  const submit: MouseEventHandler = () =>
    dispatch(updatePortfolio(selectedOption));

  const handleChange = (
    inputValue: string
  ): void | Promise<OptionsOrGroups<never, never>> => {
    const config: AxiosRequestConfig = {
      params: {
        name: inputValue,
      },
    };
    return axios.get(COMPANIES_PATH, config).then(({ data }) => data);
  };
  return (
    <div className="flex">
      <div className="md:w-1/3 my-5 px-3">
        <h2 className="text-[2.3rem] font-semibold  ">Add Asset</h2>
        <div className="flex align-center ">
          <AsyncSelect
            className="w-3/4 p-0 h-min"
            cacheOptions
            loadOptions={handleChange}
            onChange={(e) => setSelectedOption(e ? Object(e).value : "")}
          ></AsyncSelect>
          <div className="pl-3">
            <Button name="select" action={submit} type="submit"></Button>
          </div>
        </div>
      </div>
      <div className="xl:w-50 md:w-2/3">
        <h2 className="text-[2.3rem] font-semibold pt-5 px-3">
          Your Portfolio
        </h2>
        {portfolioHasItems &&
          portfolio.map(({ label, id, value, logo, weburl }: ItemProps) => (
            <div className="w-full divide-y p-5 border-b" key={id}>
              <div className="flex w-full">
                <img src={logo} alt="" className="mr-5 w-[56px] h-[56px] " />
                <div>
                  <h6 className="border-white text-xl">
                    {label} ({value})
                  </h6>
                  <p className="text-gray-500">{weburl}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
