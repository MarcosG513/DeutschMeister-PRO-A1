const { execSync } = require('child_process');
try {
  console.log('Initializing Capacitor...');
  execSync('npx cap init "DeutschMeister PRO" "com.deutschmeister.app" --web-dir dist', { stdio: 'inherit' });
  
  console.log('Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Installing Android package...');
  execSync('npm install @capacitor/android', { stdio: 'inherit' });
  
  console.log('Adding Android platform...');
  execSync('npx cap add android', { stdio: 'inherit' });
  
  console.log('Syncing Android...');
  execSync('npx cap sync android', { stdio: 'inherit' });
  
  console.log('All Capacitor setup complete!');
} catch (error) {
  console.error('An error occurred:', error.message);
}
