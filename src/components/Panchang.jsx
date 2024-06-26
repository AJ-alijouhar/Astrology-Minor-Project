import React, { useEffect, useState } from 'react'

import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';

import { Button, Popover, Tooltip } from '@mui/material';


import Aquarius from '../assets/xaquarius_kumbha.png';
import Aries from '../assets/xaries_mesha.png';
import Cancer from '../assets/xcancer_karka.png';
import Capricorn from '../assets/xcapricorn_makara.png';
import Gemini from '../assets/xgemini_mithuna.png';
import Leo from '../assets/xleo_simha.png';
import Libra from '../assets/xlibra_tula.png';
import Pisces from '../assets/xpisces_meena.png';
import Sagittarius from '../assets/xsagittarius_dhanu.png';
import Scorpio from '../assets/xscorpio_vrishchika.png';
import Taurus from '../assets/xtaurus_vrishabha.png';
import Virgo from '../assets/xvirgo_kanya.png';
import BGIMG from '../assets/bg4.jpg';
import MainSection from './MainSection';

const IMAGE = {
  Aquarius,
  Aries,
  Cancer,
  Capricorn,
  Gemini,
  Leo,
  Libra,
  Pisces,
  Sagittarius,
  Scorpio,
  Taurus,
  Virgo
}


const formatDate = (dateObj) => {
  const day = String(dateObj?.getDate())?.padStart(2, '0');
  const month = String(dateObj?.getMonth() + 1)?.padStart(2, '0');
  const year = String(dateObj?.getFullYear())?.slice(-2); // Extract last 2 digits of the year

  return `${day}/${month}/${year}`;
};

function Panchang(props) {
  const [panjiData, setPanjiData] = useState([]);
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [ID, setID] = useState("AUSPICIOUS TIME");



  let date;
  let time;
  if (props.date)
    date = new Date(props.date['$d']);
  else
    date = new Date();

  if (props.time)
    time = new Date(props.time['$d']);
  else
    time = new Date();

  useEffect(() => {
    setEntries([]);
    setPanjiData([]);
    props.setZodiacData(null);

    const fetchData = async () => {
      console.log(formatDate(date));
      try {
        setIsLoading(true);
        const response = await fetch(`https://online-panchang.onrender.com/api/panjiData?ENG_DATE=${formatDate(date)}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        console.log(data);

        setPanjiData(data);
        props.setZodiacData(data);
        setIsLoading(false);
      } catch (error) {
        alert('Error fetching data: ' + error);
      }
    };

    fetchData();
  }, [props.date]);



  // console.log(props.time);


  // Extract all the keys from the panjiData.
  if (panjiData.length >= 1 && entries.length === 0) {
    setEntries(Object.entries(panjiData[0]));
    // console.log(entries);
    // console.log(panjiData[0]["CHANDRA SUDDHI"].FULL);
  }


  // console.log(formatDate(date));


  // *****************************Handlers****************************//

  // Giving a search functionality for searchbox
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  // Clear the state when Enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery('');
    }
  };

  // Handle popover
  const handleClick = (event) => {
    setID(event.currentTarget.id)
    // console.log(event.currentTarget.id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // *****************************Handlers End****************************//

  return (
    <div className='mr-0' style={{ backgroundImage: `url(${BGIMG})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>

      <div className='p-5 w-full'  >

        {/* Search Box */}
        <div className='float-left bg-slate-500 rounded-md border border-white'>
          <div style={{ width: 350, display: 'flex', alignItems: 'center', padding: '5px' }}>
            <SearchIcon style={{ marginRight: '5px', color: "whitesmoke" }} />
            <InputBase
              placeholder="Search..."
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              value={searchQuery}
              inputProps={{ 'aria-label': 'search' }}
              sx={{ color: "white" }}
            />
          </div>
        </div>

        {/* Headline */}
        <div className="mt-4 bg-transparent min-w-full w-full min-h-[100vh] py-8 ">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-[#71c3f7] to-[#f6f6f6]">Panchang for {date.toDateString()}</h1>

            {/* If there is no data for that perticular date */}
            {entries.length === 0 && !isLoading && <p className='text-2xl mt-52 font-bold text-white opacity-90'>No data is available for this date 📪</p>}


            {isLoading && <div>
              <img className='object-cover' src="https://media.tenor.com/ZiTcv4QbONsAAAAi/discord-world.gif" alt="" />
              {/* <p className='text-2xl text-center font-bold text-slate-300'>Fetching</p> */}
            </div>}

            {/* If data is available for that perticular date */}
            <div className="flex flex-wrap justify-between  gap-5 w-full">
              {entries && entries.map((item, ind) => (
                (item[0] !== "YOGINI" &&
                item[0] !== "CHANDRA SUDDHI" &&
                item[0] !== "GHATA CHANDRA") &&
                item[0] !== "AUSPICIOUS TIME" &&
                item[0] !== "BARRED/INAUSPICIOUS TIME" &&
                item[0] !== "TARA SUDDHI" &&
                item[0] !== "_id" &&
                item[0] !== "_v0" &&
                

                (item[0].toLowerCase().includes(searchQuery.toLowerCase()) &&
                  <div key={ind} className="border border-slate-300 p-3 sm:w-[300px] w-full rounded-md hover:border-l-4 hover:border-r-cyan-400 hover:border-r-4 hover:border-l-cyan-400 hover:cursor-pointer hover:shadow-2xl bg-[#1B2845] text-white hover:scale-105 transition-all">
                    <p className="font-bold">{item[0]}</p>
                    <p>{item[1]}</p>
                  </div>)

              ))}

            </div>



            {/* Auspecious and Inauspecious Popover */}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              sx={{ width: "1550" }}

            >
              <p className='p-2 text-center text-sm font-semibold'>{ID}</p>
              {
                panjiData.length > 0 && ID === "AUSPICIOUS TIME" ? panjiData[0]["AUSPICIOUS TIME"]?.map((item, ind) => {
                  return <p key={ind} className='p-2 text-sm'>{item}</p>
                })
                  :
                  panjiData.length > 0 && panjiData[0]["BARRED/INAUSPICIOUS TIME"]?.map((item, ind) => {
                    return <p key={ind} className='p-2 text-sm'>{item}</p>
                  })
              }
            </Popover>

          </div>
        </div>

        {/* Yogini and TARA suddhi */}
        <div className='w-full flex gap-10 items-center mb-8  '>

          {entries.length > 0 && "YOGINI TARA SUDDHI".toLowerCase().includes(searchQuery.toLowerCase()) &&

            <div className="border hover:border-dashed border-slate-300 p-1 mt-2 w-full rounded-md hover:cursor-pointer bg-[#1B2845] text-white">
              <div className='p-2 flex justify-between items-center' >

                {/* Yogini */}
                <div className='text-center'>
                  <p className="font-bold mb-2">Yogini</p>

                  <div className="overflow-x-auto min-w-full overflow-hidden">
                    {/* PREV VALUE [COPY THIS IF UI BROKES] : sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] */}
                    <table className="w-full table-auto border border-gray-200 ">
                      {/* <table className="w-full xl:w-[580px]  table-auto border border-gray-200 "> */}
                      <thead>

                        <tr>
                          <th className="px-4 py-2 bg-slate-400 border border-gray-200">Direction</th>
                          <th className="px-4 py-2 bg-slate-400 border border-gray-200">Period</th>
                        </tr>
                      </thead>
                      <tbody>
                        {panjiData.length > 0 && panjiData[0]["YOGINI"].map((item, ind) => {
                          const splitData = item.split(': ')
                          // console.log(splitData);
                          return (
                            <tr>
                              <td className="px-4 py-2 border border-gray-200">{splitData[0]}</td>
                              <td className="px-4 py-2 border border-gray-200">{splitData[1]}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Tara suddhi */}
                <div className='text-center'>
                  <p className="font-bold mb-2">Tara Suddhi</p>
                  <div className="overflow-x-auto ">
                    {/*PREV VALUE [COPY THIS IF UI BROKES] : sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] */}
                    <table className="w-full  table-auto border border-gray-200 ">
                      <thead>

                        <tr>
                          <th className="px-4 py-2 bg-slate-400 border border-gray-200">Tara</th>
                          <th className="px-4 py-2 bg-slate-400 border border-gray-200">Period</th>
                        </tr>
                      </thead>
                      <tbody>
                        {panjiData.length > 0 && panjiData[0]["TARA SUDDHI"].map((item, ind) => {
                          const splitData = item.split(' : ')
                          // console.log(splitData);
                          return (
                            <tr>
                              <td className="px-4 py-2 border border-gray-200">{splitData[0]}</td>
                              <td className="px-4 py-2 border border-gray-200">{splitData[1]}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>

                </div>


              </div>

              <div className='flex justify-around'>

                {/* <IconButton id='AUSPICIOUS TIME' onClick={handleClick} sx={{ marginTop: 2 }}>
                    <InfoIcon color='primary' />
                  </IconButton> */}

                <Button id='AUSPICIOUS TIME' color='success' variant='contained' onClick={handleClick} sx={{ marginTop: 2, color: "white" }}>
                  AUSPICIOUS TIME
                </Button>



                {/* <IconButton id='INAUSPICIOUS TIME' onClick={handleClick} sx={{ marginTop: 2 }}>
                    <InfoIcon color='warning' />
                    
                  </IconButton> */}
                <Button id='INAUSPICIOUS TIME' color='error' variant='contained' onClick={handleClick} sx={{ marginTop: 2 }}>
                  INAUSPICIOUS TIME
                </Button>


              </div>


            </div>


          }




        </div>
        {/* Table */}
        {panjiData.length > 0 && <div className='w-full border mb-8 border-slate-300 p-3 rounded-md hover:border-dashed hover:cursor-pointer bg-[#1B2845] text-white  transition-all  mr-14'>
          <div>
            <p className='font-bold'>CHANDRA SUDDHI</p>
            {/*  */}
            {panjiData.length > 0 && panjiData[0]["CHANDRA SUDDHI"] && Object.entries(panjiData[0]["CHANDRA SUDDHI"])?.map(([key, value]) => {
              return (
                <div className='flex gap-2 items-center space-y-4 '>
                  <p className='w-[150px]'>{key}</p>
                  {value?.map((item, ind) => {
                    return (
                      <div>
                        <div className='flex justify-center'>
                          <img className='object-cover w-[70px] h-[70px] hover:cursor-pointer hover:scale-125 transition-all' src={IMAGE[item]} alt="" />
                        </div>
                        <p className='text-center'>{item}</p>
                      </div>

                    )
                  })}
                </div>)

            })}
          </div>

          <div>
            <p className='font-bold mt-5'>GHATA CHANDRA</p>
            {panjiData.length > 0 && panjiData[0]["GHATA CHANDRA"] && Object.entries(panjiData[0]["GHATA CHANDRA"])?.map(([key, value]) => {
              return (
                <div className='flex gap-2 items-center space-y-4'>
                  <p className='w-[150px]'>{key}</p>
                  {value?.map((item, ind) => {
                    return (
                      <div>
                        <div className='flex justify-center'>
                          <img className='object-cover w-[70px] h-[70px] hover:cursor-pointer hover:scale-125 transition-all' src={IMAGE[item]} alt="" />
                        </div>
                        <p className='text-center'>{item}</p>
                      </div>

                    )
                  })}
                </div>)

            })}
          </div>
        </div>}

        {panjiData.length > 0 && <MainSection />}

      </div>
    </div>
  )
}

export default Panchang













