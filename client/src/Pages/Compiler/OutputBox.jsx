import React, { useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { executeCode } from "./api";

const OutputBox = ({ editorRef, language, stdin, lightTheme }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const toast = useToast();

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    console.log(sourceCode);
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode, stdin);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run the code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <p className={`mb-2 text-lg ${lightTheme?'text-gray-900':'text-gray-400'}`}>Output :</p>
      <Button
        variant={"outline"}
        colorScheme="green"
        mb={4}
        onClick={runCode}
        isLoading={isLoading}
      >
        Run Code
      </Button>
      <div
        className={`h-[40vh] lg:h-[60vh] p-2 border rounded-lg overflow-y-scroll ${lightTheme?'text-gray-900':'text-gray-400'} ${
          isError ? "border-red-500" : "border-[#333]"
        }`}
      >
        {output
          ? output.map((line, index) => (
              <p
                className={`${isError ? "text-red-500" : lightTheme?'text-gray-900':'text-gray-400'}`}
                key={index}
              >
                {line}
              </p>
            ))
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default OutputBox;
