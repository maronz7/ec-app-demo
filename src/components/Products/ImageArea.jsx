import React, { useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/styles";
import { storage } from "../../firebase/index";

const useStyles = makeStyles({
  icon: {
    width: 48,
    height: 48,
  },
});

const ImageArea = () => {
  const classes = useStyles();

  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files;
      let blob = new Blob(file, { type: "image/jpeg" });

      const S =
        "abcdefghikllmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      const uploadRef = storage.ref("images").child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          props.setImages((prevState) => [...prevState, newImage]);
        });
      });
    },
    [props.setImages]
  );

  return (
    <div>
      <div className="u-text-right">
        <span>商品画像を登録する</span>
        <IconButton className={classes}>
          <AddPhotoAlternateIcon />
          <input
            className="u-display-none"
            type="file"
            id="image"
            onChange={() => uploadImage()}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default ImageArea;
