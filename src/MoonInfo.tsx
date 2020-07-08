import React, { useState, useEffect } from "react";
import Moment from 'react-moment';

export interface MoonInfoProps {
  imageNo: number
}

interface MoonInfo {
  time: Date,
  phase: string,
  age: number,
  diameter: number,
  distance: number,
  j2000: J2000,
  subsolar: Subsolar,
  subearth: Subearth,
  posangle: number
}

interface J2000 {
  ra: number,
  dec: number
}

interface Subsolar {
  lon: number,
  lat: number
}

interface Subearth {
  lon: number,
  lat: number
}

const MoonInfo = (props: MoonInfoProps) => {
  const [moonInfo, setMoonInfo] = useState<MoonInfo | null>(null);

  useEffect(() => {
    fetch(`mooninfo/mooninfo.${props.imageNo}.json`)
      .then(res => res.json() as Promise<MoonInfo>)
      .then(res => {
        console.log(res);
        console.log(res.time.toString());
        console.log(new Date(res.time).toLocaleString("lt-LT"));
        setMoonInfo(res)
      });
  }, [props.imageNo]);

  const getAgeInDays = (age: number | undefined) : string => {
    if (age === undefined)
      return "";
    let days = Math.floor(age);
    let reminder = age%1;
    let hour = Math.floor(reminder*24);
    reminder = reminder*24%1;
    let mins = Math.round(reminder*60);

    return `${days}d ${hour}h ${mins}m`;
  }

  const getRa = (ra: number | undefined) : string => {
    if (ra === undefined)
      return "";
    let {hours, mins, secs} = parseTimeFromNumber(ra);
    return `${hours}h ${mins}m ${secs}s`;
  }

  const getDec = (dec: number | undefined) : string => {
    if (dec === undefined)
      return "";
    let {hours, mins, secs} = parseTimeFromNumber(dec);
    return `${hours}° ${mins}' ${secs}''`;
  }

  const parseTimeFromNumber = (input: number) : 
    {hours: number, mins: number, secs: number} => {
    let sign = 1;
    if (input < 0)
      sign = -1;
    input = Math.abs(input);
    
    let hours = Math.floor(input)*sign;
    let reminder = input%1;
    let mins = Math.floor(reminder*60);
    reminder = reminder*60%1;
    let secs = Math.round(reminder*60);
    return {hours, mins, secs};
  }

  return (
    <table>
      <tbody>
        <TableRow fieldName="Time" fieldValue={<Moment format="YYYY-MM-DD HH:mm">{moonInfo?.time}</Moment>}/>
        <TableRow fieldName="Phase" fieldValue={`${moonInfo?.phase}% (${getAgeInDays(moonInfo?.age)})`}/>
        <TableRow fieldName="Diameter" fieldValue={`${moonInfo?.diameter} arcseconds`}/>
        <TableRow fieldName="Distance" fieldValue={`${moonInfo?.distance} km (30.98 Earth diameters)`}/>
        <TableRow fieldName="J2000 Right Ascension, Declination" fieldValue={`${getRa(moonInfo?.j2000.ra)} ${getDec(moonInfo?.j2000.dec)}`}/>
        <TableRow fieldName="Subsolar Longitude, Latitude" fieldValue={`${moonInfo?.subsolar.lon}° ${moonInfo?.subsolar.lat}°`}/>
        <TableRow fieldName="Sub-Earth Longitude, Latitude" fieldValue={`${moonInfo?.subearth.lon}° ${moonInfo?.subearth.lat}°`}/>
        <TableRow fieldName="Position Angle" fieldValue={`${moonInfo?.posangle}°`}/>
      </tbody>
    </table>
  );
};

interface TableRow {
  fieldName: string,
  fieldValue: any
}

const TableRow = (props: TableRow) => {
  return (
  <tr>
    <td width='50%' align='right' style={{ color: "white" }}><b>{props.fieldName}: </b></td>
    <td/>
    <td align='left' style={{ color: "white" }}>{props.fieldValue}</td>
  </tr>
  );
}

export default MoonInfo;
