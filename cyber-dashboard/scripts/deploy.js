/**
 * Deploy script for Cyber Dashboard
 */

import { execSync } from 'child_process';

const accounts = [
    { name: 'fox0110011-coder', token: process.env.GITHUB_TOKEN_1 || 'your_token_here', repo: 'cyber-dashboard' },
    { name: 'ozehefageza031-rgb', token: process.env.GITHUB_TOKEN_2 || 'your_token_here', repo: 'cyber-dashboard' },
    { name: 'ang3l043k018-cmyk', token: process.env.GITHUB_TOKEN_3 || 'your_token_here', repo: 'cyber-dashboard' }
];

function executeCommand(command, description) {
    console.log(`🔄 ${description}...`);
    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`✅ ${description} - успешно`);
    } catch (error) {
        console.error(`❌ ${description} - ошибка:`, error.message);
        throw error;
    }
}

async function deployToAll() {
    console.log('🚀 Cyber Dashboard - Автоматический деплой');
    
    for (const account of accounts) {
        console.log(`\n🎯 Деплой на аккаунт: ${account.name}`);
        const pushUrl = `https://${account.name}:${account.token}@github.com/${account.name}/${account.repo}.git`;
        executeCommand(`git push ${pushUrl} main --force`, `Push на ${account.name}`);
    }
    
    console.log('\n🎉 Деплой завершен!');
}

deployToAll();