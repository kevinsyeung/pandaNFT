import React, { useState } from 'react';
import { useGlobalContext } from '../../contexts/GlobalContext';

const IdInput = () => {
  const [inputId, setInputId] = useState('');
  const { setUserId } = useGlobalContext(); // 从GlobalContext中获取setUserId函数

  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表单默认提交行为
    setUserId(inputId); // 更新全局userId
    setInputId(''); // 清空输入框
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your ID"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)} // 每次输入时更新inputId状态
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default IdInput;
