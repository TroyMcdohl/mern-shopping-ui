import { useState } from "react";
import "./admin.css";

const Admin = () => {
  const [name, setname] = useState();
  const [des, setdes] = useState();
  const [price, setprice] = useState();
  const [color, setcolor] = useState();
  const [size, setsize] = useState();
  const [kind, setkind] = useState();
  const [fileupload, setfileupload] = useState();

  console.log(fileupload);

  const clickHandler = async () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("des", des);
    form.append("color", color);
    form.append("size", size);
    form.append("kind", kind);

    for (let i = 0; i < fileupload.length; i++) {
      form.append("images", fileupload[i]);
    }

    const res = await fetch(
      "https://mern-shopping-backend-server.vercel.app/api/v1/products",
      {
        method: "POST",
        credentials: "include",
        body: form,
      }
    );

    console.log(await res.json());
  };

  return (
    <div
      className="form_container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "50vh",
        width: "50%",
      }}
    >
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setname(e.target.value)}
      />
      <input
        type="text"
        placeholder="price"
        onChange={(e) => setprice(e.target.value)}
      />
      <input
        type="text"
        placeholder="des"
        onChange={(e) => setdes(e.target.value)}
      />
      <input
        type="text"
        placeholder="color"
        onChange={(e) => setcolor(e.target.value)}
      />
      <select name="" id="" onChange={(e) => setsize(e.target.value)}>
        <option value="sm">sm</option>
        <option value="md">md</option>
        <option value="lg">lg</option>
      </select>
      <select name="" id="" onChange={(e) => setkind(e.target.value)}>
        <option value="shirt">shirt</option>
        <option value="t-shirt">t-shirt</option>
        <option value="sport-shirt">sport-shirt</option>
        <option value="jacket">jacket</option>
        <option value="dress">dress</option>
      </select>
      <input
        type="file"
        placeholder="img"
        multiple
        onChange={(e) => setfileupload(e.target.files)}
      />
      <button onClick={clickHandler}>create</button>
    </div>
  );
};

export default Admin;
