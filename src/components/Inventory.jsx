import React from 'react';
import AddFishForm from './AddFishForm';

const Inventory = ({addFish}) => (
  <div>
    <h2>Inventory</h2>
    <AddFishForm addFish={addFish} />
  </div>
);

export default Inventory;
