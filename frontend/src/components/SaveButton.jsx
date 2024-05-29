import React, { useState, useEffect } from 'react';
import { IconButton, useToast } from '@chakra-ui/react';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const SaveButton = ({ recruitmentId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const toast = useToast();

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
      icon={isSaved ? <MdBookmark /> : <MdBookmarkBorder />}
      onClick={handleSave}
      variant="ghost"
      aria-label="Save Recruitment"
      size="2xl"
    />
  );
};

export default SaveButton;
