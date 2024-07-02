import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { useUser } from '../context/UserContext';

const useLogout = () => {
  const router = useRouter();
  const toast = useToast();
  const { logout: contextLogout } = useUser(); // UserContextからlogout関数を取得

  const logout = () => {
    if (window.confirm('ログアウトしてもよろしいですか？')) {
      // UserContextのlogout関数を呼び出し
      contextLogout();
      
      // ログアウト成功のトースト通知
      toast({
        title: "ログアウト成功",
        description: "ログアウトしました。",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // ログインページにリダイレクト
      router.push('/login');
    }
  };

  return logout;
};

export default useLogout;