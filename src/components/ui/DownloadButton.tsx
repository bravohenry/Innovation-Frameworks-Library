import React, { useState } from 'react';
import { Button, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';

interface DownloadButtonProps {
  templateUrl: string;
  fileName?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ templateUrl, fileName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkExists = async (url: string): Promise<boolean> => {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      return res.ok;
    } catch (e) {
      return false;
    }
  };

  const handleDownload = async () => {
    setError(null);
    setIsLoading(true);

    const normalizedBase = (import.meta as any).env?.BASE_URL || '/';
    const prefixedUrl = templateUrl.startsWith('http') ? templateUrl : `${normalizedBase.replace(/\/$/, '')}${templateUrl}`;
    const exists = await checkExists(prefixedUrl);
    if (!exists) {
      setIsLoading(false);
      setError('模板文件不存在，请稍后重试或联系维护者。');
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = prefixedUrl;
      link.download = fileName || templateUrl.split('/').pop() || 'template.pptx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip content="下载空白模板">
      <Button
        color={error ? "danger" : "primary"}
        variant="solid"
        onPress={handleDownload}
        isLoading={isLoading}
        startContent={!isLoading && <Icon icon={error ? "mdi:alert" : "lucide:download"} />}
      >
        下载模板
      </Button>
      {error && (
        <span className="ml-2 text-danger text-sm">{error}</span>
      )}
    </Tooltip>
  );
};

export default DownloadButton;