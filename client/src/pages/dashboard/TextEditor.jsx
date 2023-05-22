import React, { useState } from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = () => {
  const [content, setContent] = useState('');

  return (
    <div>
      <JoditEditor
        value={content}
        config={{
          readonly: false,
          placeholder: 'Start typing...',
        }}
        tabIndex={1}
        onBlur={newContent => setContent(newContent)}
        onChange={newContent => {}}
      />
    </div>
  );
};

export default TextEditor;
