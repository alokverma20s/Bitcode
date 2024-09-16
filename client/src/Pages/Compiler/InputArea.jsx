const InputArea = ({stdin, setStdin, lightTheme}) => {

  return (
    <div>
      <p className={`mb-2 text-xl ${lightTheme?'text-gray-900':'text-gray-400'}`} >Input: </p>
      <textarea
        className={`resize-none w-full h-[5.5rem] bg-transparent  p-2 border rounded-lg ${lightTheme?'text-gray-900 border-gray-800':'text-gray-400'} text-sm`}
        value={stdin}
        onChange={(e) => setStdin(e.target.value)}
        placeholder="Input here..."
      />
    </div>
  );
};

export default InputArea;
