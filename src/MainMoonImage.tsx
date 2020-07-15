import React from "react";

const rootImgPath: string = "https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004768/frames/730x730_1x1_30p/";

export interface MainMoonImageProps {
  imageNo: number
}

const MainMoonImage = (props: MainMoonImageProps) => {

  return (
    <div className='moon_image_container moon_image_container_big'>
      <img className='moon_image' src={`${rootImgPath}moon.${props.imageNo}.jpg`} alt=""></img>
      <div >
        <img className='moon_image' src={`https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004768/frames/5760x3240_16x9_30p/labels/label.${props.imageNo}.png`} alt=""></img>
      </div>
    </div>
  );
};

export default MainMoonImage;