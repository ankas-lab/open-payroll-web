import React from "react";
import Text from "@/components/generals/text";
import Button from "@/components/generals/button";

const index = () => {
  return (
    <div className="w-10/12 flex flex-col gap-[20px]">
      <div className="">
        <Text type="h4" text="Beneficiaries" />
        <Text
          type=""
          text="These are all the beneficiaries that exist in your contract, you can add, delete or edit them."
        />
      </div>

      <div className="flex flex-col gap-[10px]">
        {/* Beneficiarie header row */}
        <div className="flex gap-[20px] text-left w-12/12">
          <div className="w-2/12">
            <Text type="overline" text="name" />
          </div>
          <div className="w-2/12">
            <Text type="overline" text="address" />
          </div>
          {/*initialMultipliers
          .filter((m) => m.state === "active")
          .map((ma) => (
            <div className="w-2/12">
              <Text type="overline" text={ma.name} />
            </div>
          ))*/}
          <div className="w-2/12">
            <Text type="overline" text="final pay" />
          </div>
          <div className="w-2/12"></div>
        </div>
        <form className="flex flex-col gap-[5px]">
          {/* Beneficiarie row */}
          {/* 👇 .map of active multipliers 👇 */}
          {/*initialBeneficiaries.map((b) => (
          <div className="flex gap-[20px] text-left w-12/12 items-center">
            <div className="w-2/12">
              <input
                value="name a"
                name="beneficiarieName"
                className="capitalize w-full bg-opwhite border-2 rounded-[5px] p-1"
              />
            </div>
            <div className="w-2/12">
              <input
                value={b.address}
                name="beneficiarieAddress"
                className="w-full bg-opwhite border-2 rounded-[5px] p-1"
              />
            </div>
            <div className="w-2/12">
              <input
                name="beneficiarieMultiplier1"
                className="w-full bg-opwhite border-2 rounded-[5px] p-1"
              />
            </div>
            <div className="w-2/12">
              <input
                name="beneficiarieMultiplier2"
                className="w-full bg-opwhite border-2 rounded-[5px] p-1"
              />
            </div>
            <div className="w-2/12">
              <Text type="" text="000 DOT" />
            </div>
            <div className="w-2/12">
              <Button type="text" text="" icon="delete" />
            </div>
          </div>
        ))/*}
        {/* 👆 .map of active multipliers 👆 */}
        </form>
        <hr className="border-2 rounded my-[10px] w-10/12 "></hr>
        <div className="flex w-9/12 justify-between px-1">
          <Text type="h4" text="Total pay" />
          <Text type="h4" text="000 DOT" />
        </div>
      </div>

      <div>
        <Button type="outlined" text="add other" icon="add" />
      </div>
      <div>
        <Button type="active" text="confirm update" icon="" />
      </div>
    </div>
  );
};

export default index;
