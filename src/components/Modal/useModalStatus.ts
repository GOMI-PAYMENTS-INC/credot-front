import { useState } from 'react';

// 커스텀 훅
export const useModalStatus = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 껏다 켰다 하는 부분
  function toggle() {
    setIsModalVisible(!isModalVisible);
  }

  return {
    isModalVisible,
    toggle,
  };
};
