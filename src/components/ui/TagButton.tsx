import React from 'react';
import { Chip } from '@heroui/react';

interface TagButtonProps {
  tag: string;
  onClick?: (tag: string) => void;
  isActive?: boolean;
}

const TagButton: React.FC<TagButtonProps> = ({ tag, onClick, isActive = false }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(tag);
    }
  };

  return (
    <Chip
      color={isActive ? "primary" : "default"}
      variant={isActive ? "solid" : "flat"}
      onClick={handleClick}
      className="cursor-pointer"
    >
      {tag}
    </Chip>
  );
};

export default TagButton;