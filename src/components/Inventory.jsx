import React from 'react';
import AddFishForm from './AddFishForm';

const Inventory = ({addFish, loadSamples}) => (
  <div>
    <h2>Inventory</h2>
    <AddFishForm addFish={addFish} />
    <button onClick={loadSamples}>Load Sample Fishes</button>
  </div>
);

export default Inventory;
