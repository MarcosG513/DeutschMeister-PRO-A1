const fs = require('fs');
const appPath = 'src/App.jsx';
let content = fs.readFileSync(appPath, 'utf8');

const missingCode = `  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTutorOpen, isChatLoading, isTutorFullscreen]);

  const activeChapter = useMemo(() => chapters.find(c => c.id === activeChapterId), [activeChapterId]);
  const activePresentation = useMemo(() => goetheModules.find(p => p.id === activePresentationId), [activePresentationId]);

  useEffect(() => {
    if (activeChapter?.isRedemittel && viewMode === "flashcards") {
      setViewMode("table");
    }
  }, [activeChapterId, viewMode, activeChapter]);

  const displayedWords = useMemo(() => {
    if (searchTerm.trim() !== "") {
      const lowerTerm = searchTerm.toLowerCase();`;

// Restore missing code
if (!content.includes('const activeChapter = useMemo')) {
    content = content.replace(
        '      const lowerTerm = searchTerm.toLowerCase();',
        missingCode
    );
    console.log('Restored missing hooks!');
}

// Now safely patch generateStory
const storyRegex = /const generateStory = async \(\) => \{\r?\n\s*if \(\!activeChapter\) return;\r?\n\s*setStoryState\(\{ isOpen: true, loading: true, de: "", es: "" \}\);/;

if (storyRegex.test(content)) {
    content = content.replace(storyRegex, `const generateStory = async () => {
    if (!activeChapter) return;
    const granted = await showRewardVideo();
    if (!granted) return;
    setStoryState({ isOpen: true, loading: true, de: "", es: "" });`);
    console.log('generateStory patched successfully!');
} else {
    console.log('generateStory regex not found!');
}

fs.writeFileSync(appPath, content, 'utf8');
