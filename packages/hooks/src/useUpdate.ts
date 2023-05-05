/**
 * @description 强制更新
 */
import { useCallback, useState } from 'react';

const useUpdate = () => {
  const [, setState] = useState({});
  return useCallback(() => setState({}), []);
};

export default useUpdate;
