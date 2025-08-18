import React, { useState } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';

// ✅ Import Froala CSS
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/plugins/code_view.min.css';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/css/plugins/emoticons.min.css';



import 'froala-editor/js/plugins.pkgd.min.js';

export function TextEditor({ value, onChange }) {


  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <FroalaEditor
        tag='textarea'
        model={value}
        onModelChange={(html) => {
          onChange(html);
        }}
        config={{
          placeholderText: 'Start typing your course content...',
          toolbarSticky: true,
          height: 400
        }}
      />
    </div>
  );
}
