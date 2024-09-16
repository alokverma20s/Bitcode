import React, { useState } from "react";
import EditorComponent from "./EditorComponent";

const CodeEditor = () => {
  const [lightTheme, setLightTheme ] = useState(true);
  return (
    <div className={`min-h-[100vh] ${lightTheme?'bg-[#E1E3F2]':'bg-[#201e24]'} px-6 py-20`}>
      <EditorComponent setLightTheme = {setLightTheme} lightTheme= {lightTheme} />
    </div>
  );
};

export default CodeEditor;
