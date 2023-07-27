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

  function addCustomCSS(content) {
    return content;
  }

  return (
    <Editor
      tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={props.content}
      init={{
        min_height: 700,
        menubar: true,
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
        content_style: "@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300&display=swap'); body{font-family: Lexend Deca} img {max-width: 100%;height: auto;}",
        images_upload_url: "http://localhost:8000/api/upload-image/",
        images_upload_handler: uploadImage,
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | image | bullist numlist outdent indent | " +
          "removeformat | help",
        file_picker_types: 'image',
        paste_as_text: false,
        setup: function(editor) {
          editor.on('paste', function(e) {
            // Manipule o conteúdo colado aqui antes que seja inserido no editor
            var clipboardContent = (e.originalEvent || e).clipboardData.getData('text/html');
            var modifiedContent = addCustomCSS(clipboardContent);
            e.preventDefault();
            editor.execCommand('mceInsertContent', false, modifiedContent);
          });
          editor.on('NodeChange', function (e) {
            if (e && e.element.nodeName === 'IMG') {
              e.element.classList.add('img-600-responsive');
              if (e.element.getAttribute('width') > '1000px' && e.element.getAttribute('width') <= '1100px') {
                e.element.classList.add('img-1000-1100-responsive')
              }
              if (e.element.getAttribute('width') > '900px') {
                e.element.classList.add('img-900-1000-responsive')
                e.element.classList.remove('img-1000-1100-responsive');
              }

              if (e.element.getAttribute('width') > '800px' && e.element.getAttribute('width') < '900px') {
                e.element.classList.add('img-800-900-responsive')
                e.element.classList.remove('img-900-1000-responsive')
                e.element.classList.remove('img-1000-1100-responsive');
              }
              if (e.element.getAttribute('width') > '700px' && e.element.getAttribute('width') < '800px') {
                e.element.classList.add('img-700-800-responsive');
                e.element.classList.remove('img-800-900-responsive')
                e.element.classList.remove('img-900-1000-responsive')
                e.element.classList.remove('img-1000-1100-responsive');
              }
              if (e.element.getAttribute('width') > '600px' && e.element.getAttribute('width') < '700px') {
                e.element.classList.add('img-600-700-responsive');
                e.element.classList.remove('img-700-800-responsive');
                e.element.classList.remove('img-800-900-responsive')
                e.element.classList.remove('img-900-1000-responsive')
                e.element.classList.remove('img-1000-1100-responsive');
              }
            }

            if(e.element.nodeName === 'H1' 
            || e.element.nodeName === 'H2' 
            || e.element.nodeName === 'H3' 
            || e.element.nodeName === 'H4' 
            || e.element.nodeName === 'H5' 
            || e.element.nodeName === 'H6'){
              e.element.classList.add('h-space')
            }
            if(e.element.nodeName === 'A'){
              e.element.classList.add('a-space')
            }
            if(e.element.nodeName === "P"){
              e.element.classList.add('p-space');
            }
            if(e.element.nodeName === "LI"){
              e.element.classList.add('li-space');
            }
          });
        },
      }}
      onEditorChange={props.handleOnEditorChange}
    />
  );
}
