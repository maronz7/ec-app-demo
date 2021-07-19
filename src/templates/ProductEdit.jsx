import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput, SelectBox, PrimaryButton } from "../components/UIkit";
import ImageArea from "../components/Products/ImageArea";
import { saveProducts } from "../reducks/products/operations";
import { db } from "../firebase";
import { SetSizesArea } from "../components/Products";

const ProductEdit = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split("/product/edit")[1];

  if (id !== "") {
    id = id.split("/")[1];
  }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );
  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );
  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  const genders = [
    { id: "all", name: "すべて" },
    { id: "male", name: "メンズ" },
    { id: "female", name: "レディース" },
  ];

  const categories = [
    { id: "pants", name: "パンツ" },
    { id: "shirt", name: "シャツ" },
  ];

  useEffect(() => {
    if (id !== "") {
      db.collection("products")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();

          setName(data.name);
          setDescription(data.description);
          setCategory(data.category);
          setImages(data.images);
          setGender(data.gender);
          setPrice(data.price);
          setSizes(data.sizes);
        });
    }
  }, [id]);

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">商品情報の登録</h2>
      <ImageArea images={images} setImages={setImages} />
      <TextInput
        fullWidth={true}
        label={"商品名"}
        multiline={false}
        required={true}
        rows={1}
        value={name}
        type={"text"}
        onChange={inputName}
      />
      <TextInput
        fullWidth={true}
        label={"商品詳細"}
        multiline={true}
        required={false}
        rows={5}
        value={description}
        type={"text"}
        onChange={inputDescription}
      />
      <SelectBox
        label={"カテゴリー"}
        options={categories}
        required={true}
        select={setCategory}
        value={category}
      />
      <SelectBox
        label={"性別"}
        options={genders}
        required={true}
        select={setGender}
        value={gender}
      />
      <TextInput
        fullWidth={true}
        label={"価格"}
        multiline={false}
        required={true}
        rows={1}
        value={price}
        type={"number"}
        onChange={inputPrice}
      />
      <div className="module-spacer--small"></div>
      <SetSizesArea sizes={sizes} setSizes={setSizes} />
      <div className="module-spacer--small"></div>

      <div className="center">
        <PrimaryButton
          label="商品情報を保存する"
          onClick={() =>
            dispatch(
              saveProducts(
                id,
                name,
                description,
                category,
                gender,
                price,
                images,
                sizes
              )
            )
          }
        />
      </div>
    </section>
  );
};

export default ProductEdit;
