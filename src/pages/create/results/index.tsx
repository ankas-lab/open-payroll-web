import React from "react";

import Button from "../../../components/generals/button";
import Text from "../../../components/generals/text";
import { AiOutlineLoading } from "react-icons/ai";
import Link from "next/link";

interface Result {
  result: "creating" | "loading" | "done" | "error";
  handleEmptyAll: any;
}

const Result: React.FC<Result> = ({ result, handleEmptyAll }) => {
  return (
    <div className="w-10/12 md:w-8/12 mx-auto flex flex-col gap-[20px] md:gap-[40px] my-[50px] md:my-[100px]">
      {result === "loading" && (
        <div className="m-auto">
          <AiOutlineLoading className="w-10 h-10 animate-spin" />
        </div>
      )}
      {result === "done" && (
        <div className="flex flex-col gap-[20px]">
          <div className="gap-[5px]">
            <Text type="h2" text="Your contract was created successfully" />
            <Text
              type=""
              text="Congratulations! You created your contract successfully"
            />
          </div>
          <div className="flex gap-[10px]">
            <div>
              <Button
                type="outlined"
                text="create other contract"
                action={handleEmptyAll}
              />
            </div>
            <Link href="/contracts">
              <Button type="active" text="see my contracts" />
            </Link>
          </div>
        </div>
      )}
      {result === "error" && (
        <div className="flex flex-col gap-[20px]">
          <div className="gap-[5px]">
            <Text type="h2" text="An error has occurred" />
            <Text type="" text="error" />
          </div>
          <div className="flex gap-[10px]">
            <div className="">
              <Button type="outlined" text="cancel" />
            </div>
            <div className="">
              <Button type="active" text="correct data and try again" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
