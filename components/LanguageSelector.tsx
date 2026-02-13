import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface Props {
  current: Language;
  onChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<Props> = ({ current, onChange }) => {
  return (
    <div className="relative inline-flex items-center group">
      <Globe className="w-5 h-5 text-primary mr-2" />
      <select
        value={current}
        onChange={(e) => onChange(e.target.value as Language)}
        className="bg-transparent text-sm font-mono text-primary outline-none cursor-pointer uppercase appearance-none"
      >
        <option value="en" className="bg-surface text-gray-200">ENG</option>
        <option value="zh" className="bg-surface text-gray-200">CHN</option>
        <option value="ja" className="bg-surface text-gray-200">JPN</option>
        <option value="ko" className="bg-surface text-gray-200">KOR</option>
      </select>
    </div>
  );
};
