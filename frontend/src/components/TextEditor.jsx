// components/common/TextEditor.jsx
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TextEditor({ value, onChange }) {
  return (
    <div className="bg-white border rounded-md shadow-sm">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="min-h-[200px]"
        placeholder="Write your blog content here..."
        modules={TextEditor.modules}
        formats={TextEditor.formats}
      />
    </div>
  );
}

// Quill toolbar options
TextEditor.modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean']
  ],
};

TextEditor.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'blockquote', 'code-block',
  'link', 'image'
];
