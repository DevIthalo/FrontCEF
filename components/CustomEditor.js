import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import axios from "axios";

export function CustomEditor(props) {
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };


  const uploadImage = (blobInfo, progress) => new Promise(async (resolve, reject) => {
    const formData = new FormData();
    formData.append('file', blobInfo.blob());
    try {
      const response = await axios.post('http://localhost:8000/api/upload-image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      resolve("http://localhost:8000" + response.data)
    } catch (error) {
      reject("Erro ao enviar, certifique-se de que você está mandando uma imagem!")
    }
  })



  return (
    <Editor
      tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={props.content}
      init={{
        min_height: 700,
        menubar: true,
        selector:'textarea',
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        content_style: "@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300&display=swap'); body{font-family: Lexend Deca;}",
        images_upload_url: "http://localhost:8000/api/upload-image/",
        images_upload_handler: uploadImage,
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | image | bullist numlist outdent indent | " +
          "removeformat | help",
        file_picker_types: 'image',
      }}
      onEditorChange={props.handleOnEditorChange}
    />
  );
}
