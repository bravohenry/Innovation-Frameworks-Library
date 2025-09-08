import React from 'react';
import { Button, Card, CardBody, CardHeader, Spinner, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { InteractiveComponentProps } from './types';

interface BaseInteractiveLayoutProps extends InteractiveComponentProps {
  title: string;
  titleEn?: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  controls?: React.ReactNode;
  pathLabels?: {
    chapter: string;
    subsection?: string;
  };
}

const BaseInteractiveLayout: React.FC<BaseInteractiveLayoutProps> = ({
  title,
  titleEn,
  children,
  loading = false,
  error = null,
  controls,
  pathLabels,
  lang,
  onExport,
  showExportButtons = true,
  className = '',
  ...props
}) => {
  const displayTitle = lang === 'en' && titleEn ? titleEn : title;

  const handleExport = (type: 'png' | 'csv') => {
    if (onExport) {
      onExport(type, props.data);
    }
  };

  if (loading) {
    return (
      <div className={`w-full aspect-video bg-content2 rounded-lg flex items-center justify-center ${className}`}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className={`w-full ${className}`}>
        <CardBody className="flex flex-col items-center justify-center py-16">
          <Icon icon="lucide:alert-circle" className="text-danger text-4xl mb-4" />
          <p className="text-danger font-medium mb-2">
            {lang === 'zh' ? '加载出错' : 'Error Loading'}
          </p>
          <p className="text-default-500 text-center">{error}</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className={`w-full space-y-6 mt-8 ${className}`}>
      {/* Path Labels */}
      {pathLabels && (
        <div className="flex items-center gap-2 text-sm text-default-500">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-md">
            {pathLabels.chapter}
          </span>
          {pathLabels.subsection && (
            <>
              <Icon icon="lucide:chevron-right" className="text-default-300" />
              <span className="bg-default-100 px-2 py-1 rounded-md">
                {pathLabels.subsection}
              </span>
            </>
          )}
        </div>
      )}

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Icon icon="lucide:activity" className="text-primary text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{displayTitle}</h3>
              <p className="text-sm text-default-500">
                {lang === 'zh' ? '交互式工具' : 'Interactive Tool'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {controls}
            {showExportButtons && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="flat"
                  startContent={<Icon icon="lucide:image" />}
                  onPress={() => handleExport('png')}
                >
                  PNG
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  startContent={<Icon icon="lucide:table" />}
                  onPress={() => handleExport('csv')}
                >
                  CSV
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        
        <Divider />
        
        <CardBody className="p-6">
          {children}
        </CardBody>
      </Card>

      {/* Mobile Note */}
      <div className="block md:hidden">
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon icon="lucide:smartphone" className="text-warning text-xl flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning-600">
                {lang === 'zh' ? '移动端提示' : 'Mobile Notice'}
              </p>
              <p className="text-xs text-default-600 mt-1">
                {lang === 'zh' 
                  ? '在移动设备上，此组件为只读预览模式。完整功能请在桌面端使用。'
                  : 'This component is in read-only preview mode on mobile. Use desktop for full functionality.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseInteractiveLayout;