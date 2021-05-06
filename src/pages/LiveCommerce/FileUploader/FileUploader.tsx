import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "../Services/LiveCommerceService";

const endpoint = `${apiURL}upload-livetron-endpoint/`;

export const FileUploader = () => {
  const [file, setFile] = useState<File | undefined>();

  const onFormSubmit = (e: any) => {
    e.preventDefault(); // Stop form submit
    if (file) {
      fileUpload(file).then(response => {
        console.log(response.data);
      });
    }
  };

  const onChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const fileUpload = async (file: File) => {
    console.log(file);

    return axios.get(`${endpoint}`).then(res => {
      console.log(res.data);
      const url = res.data.url;
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      return axios.put(url, file, config);
    });
  };

  return (
    <div>
      <input type="file" onChange={onChange} />
    </div>
  );
};
