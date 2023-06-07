import React from "react";
import Text from "../../generals/text";
import Button from "../../generals/button";

const index = () => {
  return (
    <div className="w-full md:w-8/12">
      <div className="">
        <Text type="h4" text="Multipliers" />
        <Text
          type=""
          text="These are the multipliers of your contract, you can create new ones, pause them or delete them.
To eliminate a multiplier it is necessary that it be paused for a period."
        />
      </div>

      <div className="flex flex-col gap-[10px] mt-[10px]">
        <form className="flex flex-col gap-[10px]">
          <Text type="h6" text="Active" />
          <div className="grid grid-cols-1 w-full md:w-6/12 gap-[10px]">
            {/* 👇 .map of active multipliers 👇 */}
            {/*initialMultipliers
            .filter((m) => m.state === "active")
            .map((ma) => (
              <div className="flex gap-[10px]">
                <input
                  value={ma.name}
                  id="multiplier 1"
                  type="text"
                  name="multiplier 1"
                  className="capitalize bg-opwhite border-2 border-oppurple rounded-[5px] py-1.5 px-1.5 w-full"
                  onChange={handleMultiplierChange}
                />
                <div>
                  <Button type="text" text="" icon="pause" />
                </div>
              </div>
            ))*/}
          </div>
          {/* 👆 .map of active multipliers 👆 */}
          <div>
            <Button type="outlined" text="add other" icon="add" />
          </div>
          <div className="mt-[10px]">
            <Text type="h6" text="Paused" />
            <div className="grid grid-cols-1 gap-[10px]">
              {/* 👇 .map of paused multipliers 👇 */}
              {/*initialMultipliers
              .filter((m) => m.state === "paused")
              .map((ma) => (
                <div className="flex gap-[10px] items-center capitalize">
                  <Text text={ma.name} type="" />
                  <div>
                    <Button type="text" text="" icon="delete" />
                  </div>
                </div>
              ))*/}
            </div>
          </div>
          {/* 👆 .map of paused multipliers 👆 */}
          <div className="mt-[10px]">
            {/*initialMultipliers !== newMultipliers ? (
            <Button type="active" text="confirm update" icon="" />
          ) : (
            <Button type="disabled" text="confirm update" icon="" />
          )*/}
          </div>
        </form>
      </div>
    </div>
  );
};

export default index;
