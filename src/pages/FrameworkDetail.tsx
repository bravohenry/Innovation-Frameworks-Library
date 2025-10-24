import React, { useEffect, Suspense } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Button, Card, CardBody, Chip, Divider, Breadcrumbs, BreadcrumbItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Image, Tooltip, Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';
import { getFrameworkBySlug, getChapterMeta } from '../data/frameworks';
import { useI18n } from '../contexts/I18nContext';

// Lazy load interactive components
const NorthStarFrameworkDiagram = React.lazy(() => import('../components/interactive/NorthStarFrameworkDiagram'));
const PortersFiveForcesDiagram = React.lazy(() => import('../components/interactive/PortersFiveForcesDiagram2'));
const RaciChartDiagram = React.lazy(() => import('../components/interactive/RaciChartDiagram'));
const FiveDysfunctionsDiagram = React.lazy(() => import('../components/interactive/FiveDysfunctionsDiagram'));
const PestleAnalysisDiagram = React.lazy(() => import('../components/interactive/PestleAnalysisDiagram'));
const SSwotAnalysisDiagram = React.lazy(() => import('../components/interactive/SSwotAnalysisDiagram'));
const BusinessOpportunityDiagram = React.lazy(() => import('../components/interactive/BusinessOpportunityDiagram'));
const GenericMatrixDiagram = React.lazy(() => import('../components/interactive/GenericMatrixDiagram'));
const GanttChartDiagram = React.lazy(() => import('../components/interactive/GanttChartDiagram'));

interface ParamTypes {
  slug: string;
}

// Component to render interactive elements based on framework type
const InteractiveComponent: React.FC<{ framework: any; lang: 'zh' | 'en' }> = ({ framework, lang }) => {
  const { interactive } = framework;
  if (!interactive) return null;

  switch (interactive.type) {
    case 'tree':
      if (framework.slug === 'north-star-framework') {
        return <NorthStarFrameworkDiagram />;
      }
      break;
    case 'radar':
      if (framework.slug === 'porters-five-forces') {
        return <PortersFiveForcesDiagram lang={lang} />;
      }
      break;
    case 'table':
      if (framework.slug === 'raci-chart') {
        return <RaciChartDiagram />; // 此组件内部使用 useI18n
      }
      break;
    case 'viz':
      if (framework.slug === 'five-dysfunctions-team') {
        return <FiveDysfunctionsDiagram lang={lang} />;
      }
      break;
    case 'matrix':
      if (framework.slug === 'pestle-analysis') {
        return <PestleAnalysisDiagram lang={lang} />;
      }
      break;
    case 'matrix-generic':
      return <GenericMatrixDiagram lang={lang} title={interactive.title} initialColumns={interactive.schema} data={interactive.data} />;
    case 'swot':
      if (framework.slug === 'sswot-analysis') {
        return <SSwotAnalysisDiagram lang={lang} />;
      }
      break;
    case 'canvas':
      if (framework.slug === 'business-opportunity-statement') {
        return <BusinessOpportunityDiagram lang={lang} />;
      }
      break;
    case 'gantt':
      if (framework.slug === 'gantt-chart') {
        return <GanttChartDiagram lang={lang} />;
      }
      break;
    default:
      // Generic interactive component placeholder for other types
      return (
        <div className="w-full aspect-video bg-content2 rounded-lg flex flex-col items-center justify-center p-6">
          <Icon icon="mdi:chart-box" className="text-4xl text-primary-500 mb-3" />
          <h4 className="text-lg font-semibold mb-2">{lang === 'en' ? (interactive.title?.en || interactive.title?.zh || 'Interactive Chart') : (interactive.title?.zh || '交互图表')}</h4>
          <p className="text-default-500 text-center">{lang === 'en' ? 'Interactive component under development...' : '交互组件开发中...'}</p>
        </div>
      );
  }
  
  return null;
};

const FrameworkDetail: React.FC = () => {
  const { slug } = useParams<ParamTypes>();
  const { t, lang } = useI18n();
  const history = useHistory();
  const framework = getFrameworkBySlug(slug);
  const chapterMeta = framework ? getChapterMeta(framework.chapter) : undefined;
  const subsection = framework && chapterMeta?.subsections?.find(s => s.id === framework.subsectionId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeDiagramIndex, setActiveDiagramIndex] = React.useState<number>(0);
  
  useEffect(() => {
    // Scroll to top when framework changes
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!framework) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Icon icon="lucide:file-question" className="text-neutral-400 text-6xl mb-4" />
        <h2 className="text-2xl font-semibold mb-2">{t('framework_not_found')}</h2>
        <p className="text-neutral-400 mb-6">{t('chapter_empty_desc')}</p>
        <Button as={Link} to="/" color="primary">
          {t('go_home')}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumbs */}
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem onPress={() => history.push('/')}>{t('nav_home')}</BreadcrumbItem>
        <BreadcrumbItem onPress={() => history.push(`/chapters/${framework.chapter}`)}>
          {t('chapter_prefix', { n: framework.chapter })}: {lang === 'en' ? (framework.chapterTitleEn || framework.chapterTitle) : framework.chapterTitle}
        </BreadcrumbItem>
        <BreadcrumbItem>
          {lang === 'en' ? framework.englishTitle : framework.title}
        </BreadcrumbItem>
      </Breadcrumbs>
      
      {/* Framework Header */}
      <Card className="mb-8">
        <CardBody className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Chip color="primary" variant="flat" size="sm">{t('chapter_prefix', { n: framework.chapter })}</Chip>
              {framework.subsectionId && (
                <Chip variant="flat" size="sm">
                  {framework.subsectionId} {lang === 'en' ? (subsection?.labelEn || '') : (subsection?.labelZh || '')}
                </Chip>
              )}
            </div>
            
            <h1 className="text-3xl font-bold">{lang === 'en' ? framework.englishTitle : framework.title}</h1>
            
            <p className="text-lg text-neutral-400">{lang === 'en' ? (framework.summaryEn || framework.summary) : framework.summary}</p>
            
            <div className="flex flex-wrap gap-2 mt-1">
              {(lang === 'en' ? (framework.tagsEn && framework.tagsEn.length ? framework.tagsEn : framework.tags) : framework.tags).map((tag, index) => (
                <Chip key={index} variant="flat">{tag}</Chip>
              ))}
            </div>
            
            <Divider className="my-1" />
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="flat" 
                startContent={<Icon icon="lucide:share-2" />}
                onPress={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: framework.title,
                      text: framework.summary,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Copied');
                  }
                }}
              >
                {t('share')}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* 交互组件 */}
      <div className="mt-8">
        <Suspense fallback={
          <div className="w-full aspect-video bg-content2 rounded-lg flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        }>
          <InteractiveComponent framework={framework} lang={lang} />
        </Suspense>
      </div>

      {/* Framework Content */}
      <Card>
        <CardBody className="p-6">
          { (lang === 'en' ? framework.htmlContentEn : framework.htmlContent) ? (
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: lang === 'en' ? (framework.htmlContentEn || '') : (framework.htmlContent || '') }} 
            />
          ) : (
            <p>{t('loading')}</p>
          )}

          {/* 图示画廊 */}
          {framework.diagrams && framework.diagrams.length > 0 && (
            <div className="mt-8 space-y-3">
              <Divider />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{t('diagrams')}</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="flat" startContent={<Icon icon="mdi:image-search" />} onPress={() => { setActiveDiagramIndex(0); onOpen(); }}>{t('preview')}</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {framework.diagrams.map((d, idx) => (
                  <Card key={idx} isPressable onPress={() => { setActiveDiagramIndex(idx); onOpen(); }} className="overflow-hidden">
                    <CardBody className="p-0">
                      <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                        <Icon icon="mdi:chart-donut-variant" className="text-neutral-400 text-3xl" />
                      </div>
                      <div className="p-3">
                        <div className="font-medium text-sm line-clamp-1">{d.title}</div>
                        {d.description && <div className="text-xs text-neutral-400 line-clamp-1">{d.description}</div>}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* 图示大图 Modal */}
      {framework.diagrams && framework.diagrams.length > 0 && (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:image-multiple" className="text-xl" />
                <span>{framework.diagrams[activeDiagramIndex]?.title}</span>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="w-full">
                <div className="w-full aspect-video bg-neutral-100 flex items-center justify-center rounded-lg">
                  <Icon icon="mdi:file-image" className="text-5xl text-neutral-400" />
                </div>
                {framework.diagrams[activeDiagramIndex]?.description && (
                  <p className="text-neutral-400 text-sm mt-3">{framework.diagrams[activeDiagramIndex]?.description}</p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex gap-2">
                <Button variant="flat" onPress={() => setActiveDiagramIndex((i) => Math.max(0, i - 1))} isDisabled={activeDiagramIndex === 0} startContent={<Icon icon="mdi:chevron-left" />}>{t('prev')}</Button>
                <Button variant="flat" onPress={() => setActiveDiagramIndex((i) => Math.min((framework.diagrams?.length || 1) - 1, i + 1))} isDisabled={activeDiagramIndex >= (framework.diagrams?.length || 1) - 1} endContent={<Icon icon="mdi:chevron-right" />}>{t('next')}</Button>
                <Button color="primary" variant="solid" onPress={onClose}>{t('close')}</Button>
              </div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      
      {/* Navigation */}
      <div className="mt-8">
        <Button 
          as={Link} 
          to={`/chapters/${framework.chapter}`}
          variant="flat"
          startContent={<Icon icon="lucide:arrow-left" />}
        >
          {t('back_to_chapter')}
        </Button>
      </div>
    </div>
  );
};

export default FrameworkDetail;