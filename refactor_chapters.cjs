const fs = require('fs');
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

// --- 1. Fix src/data/chapters.jsx imports ---
let chaptersCode = fs.readFileSync('src/data/chapters.jsx', 'utf8');
const componentImports = `import PresentationVocabCard from '../components/PresentationVocabCard';
import GrammarAccordion from '../components/GrammarAccordion';
import AudioSim from '../components/AudioSim';
import InteractiveQA from '../components/InteractiveQA';
`;
if (!chaptersCode.includes('PresentationVocabCard')) {
    chaptersCode = chaptersCode.replace("import React from 'react';", "import React from 'react';\n" + componentImports);
    fs.writeFileSync('src/data/chapters.jsx', chaptersCode);
}


// --- 2. Remove chapters from App.jsx and add hook ---
let appCode = fs.readFileSync('src/App.jsx', 'utf8');

// First add imports if not there
if (!appCode.includes("import { chapters }")) {
    appCode = appCode.replace("import BannerAd from './components/BannerAd';", 
        "import BannerAd from './components/BannerAd';\n" +
        "import { chapters } from './data/chapters';\n" +
        "import { useFlashcards } from './hooks/useFlashcards';");
}

let ast = babel.parseSync(appCode, {
    presets: ['@babel/preset-react'],
    filename: 'src/App.jsx'
});

const rangesToRemove = [];
let hasInjectedHook = false;

traverse(ast, {
    VariableDeclaration(path) {
        if (path.node.declarations.length === 1) {
            const decl = path.node.declarations[0];
            if (decl.id.type === 'Identifier' && decl.id.name === 'chapters') {
                rangesToRemove.push({ start: path.node.start, end: path.node.end });
            }
        }
    },
    FunctionDeclaration(path) {
        if (path.node.id && path.node.id.name === 'App') {
            // Find a good place to inject the hook
            if (!hasInjectedHook) {
                const hookCode = `\n  const { srsState, handleReview, getDueCards } = useFlashcards();\n`;
                path.node.body.body.unshift(t.identifier('__HOOK_INJECTION_POINT__'));
                hasInjectedHook = true;
            }
        }
    }
});

rangesToRemove.sort((a, b) => b.start - a.start);
let modifiedApp = appCode;
for (const range of rangesToRemove) {
    modifiedApp = modifiedApp.substring(0, range.start) + modifiedApp.substring(range.end);
}

// Now replace the injection point placeholder with actual code, using a hacky regex because babel generator formatting is annoying
ast = babel.parseSync(modifiedApp, { presets: ['@babel/preset-react'], filename: 'src/App.jsx' });
traverse(ast, {
    ExpressionStatement(path) {
        if (path.node.expression.type === 'Identifier' && path.node.expression.name === '__HOOK_INJECTION_POINT__') {
            path.replaceWithSourceString(`const { srsState, handleReview, getDueCards } = useFlashcards()`);
        }
    }
});
modifiedApp = generate(ast, {}, modifiedApp).code;

// --- 3. Pass srsState and onReview to mapped Vocab Cards in App.jsx ---
// Find where wordObj is rendered in the grid map
modifiedApp = modifiedApp.replace(
    /<\s*PresentationVocabCard\s+wordObj=\{word\}\s+cardImages=\{cardImages\}\s+regeneratedImages=\{unlockedCards\}\s+generateCardImage=\{generateCardImage\}\s+isImageLoading=\{isImageLoading\}\s+openAiTutor=\{openAiTutor\}\s+setFullscreenImage=\{setFullscreenImage\}\s+unlockedCards=\{unlockedCards\}\s*\/>/g,
    `<PresentationVocabCard wordObj={word} cardImages={cardImages} regeneratedImages={unlockedCards} generateCardImage={generateCardImage} isImageLoading={isImageLoading} openAiTutor={openAiTutor} setFullscreenImage={setFullscreenImage} unlockedCards={unlockedCards} onReview={handleReview} srsState={srsState} />`
);

// We also need to pass them to chapter.content({ ... props })
modifiedApp = modifiedApp.replace(
    /\{chapter\.content && chapter\.content\(\{/g,
    `{chapter.content && chapter.content({ onReview: handleReview, srsState: srsState,`
);

fs.writeFileSync('src/App.jsx', modifiedApp);
console.log("Chapters extracted, SRS hook integrated!");
