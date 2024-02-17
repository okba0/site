import { useState } from "react";
export default function ShowType({ data, onChange })
{
  const [selectedItem, setSelectedItem] = useState(data[0]);

  const handleSelectChange = (event) => {
    const selectedItemIndex = event.target.value;
    setSelectedItem(data[selectedItemIndex]);
    onChange(selectedItemIndex);
  };
  return (
    <>
    <div  className="dropdown-containerqw">
      <select value={selectedItem} onChange={handleSelectChange}   className="dropdown-selectqw">
        {data.map((item) => (
          <option key={item._id} value={item.type}>
            {item.type}
          </option>
        ))}
      </select>
    </div>
    </>
  );
}