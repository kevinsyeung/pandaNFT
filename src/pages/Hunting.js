import React, { useEffect, useState } from 'react';
import CardList from "../components/CardList-flex";
// import { exploreList } from "../constants/MockupData";
import '../styles/Explore.css';
import Header from "../components/Header";
import Search from "../components/Search";
import { useGlobalContext } from "../contexts/GlobalContext";
//models
import AntiqueCamera from '../assets/models/AntiqueCamera.glb';
import BarramundiFish from '../assets/models/BarramundiFish.glb';
import Avocado from '../assets/models/Avocado.glb';
import CyberCar from '../assets/models/CyberCar.glb';
import { type } from '@testing-library/user-event/dist/type';
// images
import Alien from '../assets/Images/Human/Alien.jpg';
import Bulb from '../assets/Images/Human/Bulb.jpg';
import HeartFace from '../assets/Images/Human/HeartFace.png';
import IdontKnow from '../assets/Images/Human/IdontKnow.jpg';
import MoonMan from '../assets/Images/Human/MoonMan.jpg';
import PaintMan from '../assets/Images/Human/PaintMan.jpg';
import Thumb from '../assets/Images/Human/Thumb.jpg';
import Unconsciousness from '../assets/Images/Human/Unconsciousness.png';

// 在原有的 urls 数组基础上，添加新的图片路径
const additionalImages = [
  './path/to/Images/Abstract/*',
  './path/to/Images/Animals/*',
  './path/to/Images/Human/*',
  './path/to/Images/Misc/*',
  './path/to/Images/Reality/*',


//  './path/to/Images/Abstract/Earth.jpg',
  // ...以此类推，对每一个文件添加一个条目
];



// context
// import { useGlobalContext } from '../contexts/GlobalContext';

// url数组
const urls_1 = [
  CyberCar,
  AntiqueCamera,
  BarramundiFish,
  Avocado,
  "https://images.unsplash.com/photo-1614812513172-567d2fe96a75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1541661538396-53ba2d051eed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
  "https://images.unsplash.com/photo-1573221566340-81bdde00e00b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  "https://images.unsplash.com/flagged/photo-1567934150921-7632371abb32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  "https://images.unsplash.com/photo-1608085575984-d61d8335340e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1638913970675-b5ec36292665?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
]

const humanUrl = [
  Alien,
  Bulb,
  HeartFace,
  IdontKnow,
  MoonMan,
  PaintMan,
  Thumb,
  Unconsciousness,
]

const urls = [...urls_1, ...additionalImages];
let target_url = []

// 数据生成函数
function generateData(ids) {
  ids = ids.prefered_items
  return ids.map(id => ({
    name: `NFT #${id}`,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    src: target_url[Math.floor(Math.random() * target_url.length)],
  }))
}

// 向flask请求数据
const fetchHuntingList = async (target_id) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // 将需要的参数作为请求体发送
      body: JSON.stringify({ user_id: target_id, top_k: 20 }),
    })

    if (!response.ok) {
      throw new Error('HTTP error! status: ${response.status}');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching explore list failed:", error);
    return []; // 在出错时返回空数组或其他合适的默认值
  }
};

const Hunting = () => {
  const { userId } = useGlobalContext();
  const [huntingList, setHuntingList] = useState([]);

  useEffect(() => {
    const loadHuntingList = async (userId) => {
      userId = Number(userId);
      const data = await fetchHuntingList(userId);
      if (userId == 1) {
        target_url = humanUrl;
      } else if (userId == 2) {
        target_url = urls_1;
      }
      // 生成json数据
      const generatedList = generateData(data);
      setHuntingList(generatedList);
    };
    loadHuntingList(userId);
  }, [userId]);



  return (
      <div id="hunting">
        <Header />
        <Search/>
        <div id="list-container">
          <CardList list={huntingList} />
        </div>
      </div>
  );
};

export default Hunting;