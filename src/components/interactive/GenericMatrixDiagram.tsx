import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Input, Select, SelectItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import BaseInteractiveLayout from './BaseInteractiveLayout';
import { InteractiveComponentProps } from './types';

export interface MatrixColumn {
  key: string;
  labelZh: string;
  labelEn: string;
  type?: 'text' | 'number' | 'select';
  optionsZh?: string[];
  optionsEn?: string[];
}

interface MatrixRow {
  id: string;
  values: Record<string, any>;
}

const defaultColumns: MatrixColumn[] = [
  { key: 'name', labelZh: '名称', labelEn: 'Name', type: 'text' },
  { key: 'importance', labelZh: '重要度(1-5)', labelEn: 'Importance(1-5)', type: 'number' },
  { key: 'satisfaction', labelZh: '满意度(1-5)', labelEn: 'Satisfaction(1-5)', type: 'number' },
  { key: 'notes', labelZh: '备注', labelEn: 'Notes', type: 'text' },
];

const GenericMatrixDiagram: React.FC<InteractiveComponentProps & {
  title?: { zh: string; en: string };
  initialColumns?: MatrixColumn[];
}> = ({ lang = 'zh', onExport, showExportButtons = true, className = '', initialColumns, title, data }) => {
  const [columns] = useState<MatrixColumn[]>(initialColumns && initialColumns.length ? initialColumns : defaultColumns);
  const [rows, setRows] = useState<MatrixRow[]>(() => {
    if (data && Array.isArray(data)) {
      return (data as any[]).map((v, idx) => ({ id: `r${idx + 1}`, values: v }));
    }
    return [
      { id: 'r1', values: { name: lang === 'zh' ? '示例项' : 'Sample', importance: 4, satisfaction: 2, notes: '' } },
    ];
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    // noop for now
  }, []);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: `r${Date.now()}`, values: { name: '', importance: 3, satisfaction: 3, notes: '' } },
    ]);
  };

  const updateCell = (rowId: string, colKey: string, value: any) => {
    setRows((prev) => prev.map((r) => (r.id === rowId ? { ...r, values: { ...r.values, [colKey]: value } } : r)));
  };

  const deleteRow = (rowId: string) => {
    setRows((prev) => prev.filter((r) => r.id !== rowId));
  };

  const handleExport = (type: 'png' | 'csv') => {
    if (type === 'csv') {
      const csvData = rows.map((r) => {
        const obj: Record<string, any> = {};
        columns.forEach((c) => {
          const header = lang === 'en' ? c.labelEn : c.labelZh;
          const v = r.values[c.key];
          if (v && typeof v === 'object' && ('zh' in v || 'en' in v)) {
            obj[header] = v[lang] ?? v.zh ?? v.en ?? '';
          } else {
            obj[header] = v ?? '';
          }
        });
        return obj;
      });
      onExport?.('csv', csvData);
    } else {
      onExport?.('png', { columns, rows });
    }
  };

  const controls = (
    <div className="flex items-center gap-2">
      <Button size="sm" variant="flat" color="primary" startContent={<Icon icon="lucide:plus" />} onPress={addRow}>
        {lang === 'zh' ? '添加行' : 'Add Row'}
      </Button>
      <Button
        size="sm"
        variant={isEditing ? 'solid' : 'flat'}
        color={isEditing ? 'primary' : 'default'}
        startContent={<Icon icon={isEditing ? 'lucide:check' : 'lucide:edit-3'} />}
        onPress={() => setIsEditing(!isEditing)}
      >
        {isEditing ? (lang === 'zh' ? '完成' : 'Done') : (lang === 'zh' ? '编辑' : 'Edit')}
      </Button>
    </div>
  );

  const getDisplay = (val: any): string => {
    if (val && typeof val === 'object' && ('zh' in val || 'en' in val)) {
      return val[lang] ?? val.zh ?? val.en ?? '';
    }
    return String(val ?? '');
  };

  const getSelectedKey = (col: MatrixColumn, val: any): string => {
    const arr = lang === 'en' ? (col.optionsEn || []) : (col.optionsZh || []);
    const display = getDisplay(val);
    const idx = arr.findIndex((x) => x === display);
    return idx >= 0 ? String(idx) : '';
  };

  return (
    <BaseInteractiveLayout
      title={title ? (lang === 'en' ? title.en : title.zh) : (lang === 'zh' ? '矩阵表（可编辑）' : 'Editable Matrix')}
      titleEn={title ? title.en : 'Editable Matrix'}
      lang={lang}
      onExport={handleExport}
      showExportButtons={showExportButtons}
      controls={controls}
      className={className}
      data={{ columns, rows }}
      pathLabels={{ chapter: lang === 'zh' ? '第2章' : 'Chapter 2' }}
    >
      <Card>
        <CardBody className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-default-50">
                {columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 text-left text-default-600">
                    {lang === 'en' ? c.labelEn : c.labelZh}
                  </th>
                ))}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-2 align-middle">
                      {isEditing ? (
                        c.type === 'select' ? (
                          <Select
                            aria-label="select"
                            selectedKeys={[getSelectedKey(c, r.values[c.key])]}
                            onSelectionChange={(keys) => {
                              const idx = parseInt(Array.from(keys)[0] as string, 10);
                              const zhVal = (c.optionsZh || [])[idx] ?? '';
                              const enVal = (c.optionsEn || [])[idx] ?? zhVal;
                              updateCell(r.id, c.key, { zh: zhVal, en: enVal });
                            }}
                            size="sm"
                          >
                            {(lang === 'en' ? (c.optionsEn || []) : (c.optionsZh || [])).map((opt, i) => (
                              <SelectItem key={String(i)}>{opt}</SelectItem>
                            ))}
                          </Select>
                        ) : (
                          <Input
                            size="sm"
                            type={c.type === 'number' ? 'number' : 'text'}
                            value={c.type === 'number' ? String(r.values[c.key] ?? '') : getDisplay(r.values[c.key])}
                            onChange={(e) => {
                              if (c.type === 'number') {
                                updateCell(r.id, c.key, Number(e.target.value));
                              } else {
                                const existing = r.values[c.key] && typeof r.values[c.key] === 'object' ? r.values[c.key] : { zh: '', en: '' };
                                updateCell(r.id, c.key, { ...existing, [lang]: e.target.value });
                              }
                            }}
                          />
                        )
                      ) : (
                        <span className="text-default-700">{getDisplay(r.values[c.key])}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-right">
                    {isEditing && (
                      <Button size="sm" variant="flat" color="danger" isIconOnly onPress={() => deleteRow(r.id)}>
                        <Icon icon="lucide:trash" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </BaseInteractiveLayout>
  );
};

export default GenericMatrixDiagram;


