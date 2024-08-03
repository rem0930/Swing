import React, { useState, useEffect } from 'react';
import { IconButton, useToast, useBreakpointValue } from '@chakra-ui/react';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const SaveButton = ({ recruitmentId, openLoginModal }) => {
  const [isSaved, setIsSaved] = useState(false);
  const toast = useToast();

  // useBreakpointValueでレスポンシブ対応の値を設定
  const buttonSize = useBreakpointValue({ base: '30px', md: '50px' });
  const iconSize = useBreakpointValue({ base: '20px', md: '35px' });

  useEffect(() => {
    const checkSavedStatus = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const savedRecruitments = response.data.map((bookmark) => bookmark.recruitment.id);
        setIsSaved(savedRecruitments.includes(recruitmentId));
      } catch (error) {
        console.error('Failed to check saved status', error);
      }
    };

    checkSavedStatus();
  }, [recruitmentId]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: 'ログインが必要です',
        description: 'この操作を行うにはログインしてください。',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      openLoginModal();  // ログインモーダルを開く
    return;
    }

    try {
      if (isSaved) {
        await axios.delete(`${apiUrl}/favorites/${recruitmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsSaved(false);
        toast({
          title: 'Bookmark removed',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await axios.post(
          `${apiUrl}/favorites`,
          { recruitment_id: recruitmentId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsSaved(true);
        toast({
          title: '保存しました！',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Failed to toggle bookmark', error);
      toast({
        title: '保存に失敗しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <IconButton
      icon={isSaved ? <MdBookmark size={iconSize} /> : <MdBookmarkBorder size={iconSize} />}
      onClick={handleSave}
      variant="ghost"
      aria-label="Save Recruitment"
      height={buttonSize}
      width={buttonSize}
      mx={2} // 水平方向のマージンを追加してボタン間のスペースを確保
    />
  );
};

export default SaveButton;
