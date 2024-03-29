import { useState } from "react";
export default function ShowUser({ data, onChange })
{
  const [selectedItem, setSelectedItem] = useState(data[0]);
  const handleSelectChange = (event) => {
    const selectedItemIndex = event.target.value;
    setSelectedItem(data[selectedItemIndex]);
    onChange(selectedItemIndex);
  };
  return (
    <>
    <div  className="dropdown-containerq">
      <select value={selectedItem} onChange={handleSelectChange} className="dropdown-selectq">
      <option >
            Seç
          </option>
        {data.map((item) => (
          <option key={item._id} value={item.username}>
            {item.username}
          </option>
        ))}
      </select>
    </div>
    </>
  );
}