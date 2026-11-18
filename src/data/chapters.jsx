import { MessageCircle } from 'lucide-react';
import { coreChapters } from './chaptersCore';
import { extendedChapters } from './chaptersExtended';
import { redemittelChapter } from './redemittelBegegnungen';

export { goetheModules } from './goetheModules';
export { studyPlanModules } from './studyPlanModules';

const rawChapters = [
  ...coreChapters,
  ...extendedChapters,
  {
    ...redemittelChapter,
    icon: <MessageCircle size={20} />,
  },
];

export const chapters = [...rawChapters].sort((a, b) => a.id - b.id);
