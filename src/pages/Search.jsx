import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import RadarChartComponent from '../components/RadarChartComponent';

export default function Search() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [blends, setBlends] = useState([]);
  const [selectedBlend, setSelectedBlend] = useState('');
  const [communityData, setCommunityData] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const brandSnap = await getDocs(collection(db, 'brands'));
      setBrands(brandSnap.docs.map(doc => doc.data().name));
    };
    fetchBrands();
  }, []);

  const handleBrandSelect = async (brandName) => {
    setSelectedBrand(brandName);
    const blendSnap = await getDocs(query(collection(db, 'blends'), where('brand', '==', brandName)));
    setBlends(blendSnap.docs.map(doc => doc.data().name));
  };

  const handleBlendSelect = async (blendName) => {
    setSelectedBlend(blendName);
    const logsSnap = await getDocs(query(
      collection(db, 'matchaLogs'),
      where('brand', '==', selectedBrand),
      where('blend', '==', blendName)
    ));
    setCommunityData(logsSnap.docs.map(doc => doc.data()));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search Matchas</h2>
      <select onChange={(e) => handleBrandSelect(e.target.value)} defaultValue="">
        <option value="" disabled>Select Brand</option>
        {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
      </select><br/><br/>
      {blends.length > 0 && (
        <select onChange={(e) => handleBlendSelect(e.target.value)} defaultValue="">
          <option value="" disabled>Select Blend</option>
          {blends.map(blend => <option key={blend} value={blend}>{blend}</option>)}
        </select>
      )}
      {communityData.length > 0 && (
        <>
          <h3>Community Flavor Notes</h3>
          <RadarChartComponent data={aggregateFlavorData(communityData)} />
        </>
      )}
    </div>
  );
}

function aggregateFlavorData(logs) {
  const flavorKeys = ['creaminess', 'nuttiness', 'strength', 'astringency', 'floral', 'sweet'];
  const aggregate = {};
  flavorKeys.forEach(key => {
    aggregate[key] = logs.reduce((sum, log) => sum + (Number(log[key]) || 0), 0) / logs.length;
  });
  return aggregate;
}
