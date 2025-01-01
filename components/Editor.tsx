'use client';

import React from 'react';
import {useAutosave} from 'react-autosave';
import {updateEntry} from '@/utils/api';

const Editor = ({entry}: { entry: any }) => {
  const [value, setValue] = React.useState(entry.content);
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsSaving(true);
      await updateEntry(entry.id, _value);
      setIsSaving(false);
    },
    interval: 5000,
  });

  return <div className={'w-full h-full'}>
    <div className={'text-3xl p-8'}>
      {isSaving ? 'Saving...' : 'Saved'}
    </div>
    <textarea name="" onChange={e => setValue(e.target.value)}
              className={'text-xl p-8 w-full h-full outline-none'}
              value={value}></textarea>
  </div>;

};

export default Editor;
