const git = require('isomorphic-git');
const fs = require('fs');
const path = require('path');

async function stageAndCommit() {
  const dir = path.resolve('.');
  console.log('Inspecting status matrix in:', dir);
  
  const statusMatrix = await git.statusMatrix({ fs, dir });
  
  let addedCount = 0;
  let removedCount = 0;
  
  for (const [filepath, head, workdir, stage] of statusMatrix) {
    // [filepath, head, workdir, stage]
    // workdir === 0 means file was deleted in working tree
    if (workdir === 0) {
      if (head !== 0 || stage !== 0) {
        await git.remove({ fs, dir, filepath });
        removedCount++;
      }
    } else if (workdir !== head || workdir !== stage) {
      await git.add({ fs, dir, filepath });
      addedCount++;
    }
  }
  
  console.log(`Staged: ${addedCount} files, Removed: ${removedCount} files.`);
  
  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'MarcosG513',
      email: 'mgmogollon@hotmail.com'
    },
    message: 'feat: purge admob, implement 12-chapter curriculum, official exam simulators and deploy to hosting'
  });
  
  console.log('SUCCESS! Commit created with SHA:', sha);
  return sha;
}

stageAndCommit().catch(err => {
  console.error('Commit failed:', err);
  process.exit(1);
});
