/**
 * Деплой на все 15 репозиториев одновременно
 */

import { execSync } from 'child_process';

const accounts = [
    {
        name: 'fox0110011-coder',
        token: process.env.GITHUB_TOKEN_1 || 'your_token_here'
    },
    {
        name: 'ozehefageza031-rgb',
        token: process.env.GITHUB_TOKEN_2 || 'your_token_here'
    },
    {
        name: 'ang3l043k018-cmyk',
        token: process.env.GITHUB_TOKEN_3 || 'your_token_here'
    },
    {
        name: 'pefokoh461-droid',
        token: process.env.GITHUB_TOKEN_4 || 'your_token_here'
    }
];

const repoNames = [
    'pollination-flow-manager',
    'neon-avatar-bot',
    'cyber-dashboard',
    'quantum-code-gen',
    'stellar-data-sync'
];

function executeCommand(command, description) {
    console.log(`🔄 ${description}...`);
    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`✅ ${description} - успешно`);
        return true;
    } catch (error) {
        console.error(`❌ ${description} - ошибка:`, error.message);
        return false;
    }
}

async function deployToAll() {
    console.log('🚀 Деплой на все 20 репозиториев');
    console.log('=' .repeat(60));
    
    // Проверяем git
    try {
        execSync('git status', { stdio: 'ignore' });
    } catch {
        console.log('⚠️  Git не инициализирован, инициализируем...');
        executeCommand('git init', 'Инициализация Git');
        executeCommand('git config user.name "Multi Repo Developer"', 'Настройка Git user');
        executeCommand('git config user.email "dev@multirepo.local"', 'Настройка Git email');
    }
    
    // Добавляем файлы
    executeCommand('git add .', 'Добавление файлов');
    
    // Создаем коммит
    try {
        const commitMessage = process.argv[2] || 'Update: Multi-repo deployment';
        executeCommand(`git commit -m "${commitMessage}"`, 'Создание коммита');
    } catch (error) {
        console.log('ℹ️  Нет изменений для коммита');
    }
    
    // Переименовываем ветку
    try {
        executeCommand('git branch -M main', 'Переименование ветки в main');
    } catch (error) {
        console.log('ℹ️  Ветка уже называется main');
    }
    
    let success = 0;
    let failed = 0;
    const total = accounts.length * repoNames.length;
    
    console.log('\n📤 Начинаем push на все репозитории...\n');
    
    for (const account of accounts) {
        console.log(`\n👤 Аккаунт: ${account.name}`);
        console.log('-'.repeat(60));
        
        for (const repoName of repoNames) {
            const pushUrl = `https://${account.name}:${account.token}@github.com/${account.name}/${repoName}.git`;
            
            console.log(`📦 ${repoName}...`);
            
            const result = executeCommand(
                `git push ${pushUrl} main --force`,
                `  Push на ${account.name}/${repoName}`
            );
            
            if (result) {
                success++;
                console.log(`  🔗 https://github.com/${account.name}/${repoName}`);
            } else {
                failed++;
            }
            
            console.log('');
        }
    }
    
    console.log('=' .repeat(60));
    console.log(`\n🎉 Деплой завершен!`);
    console.log(`✅ Успешно: ${success}/${total}`);
    if (failed > 0) {
        console.log(`❌ Ошибок: ${failed}/${total}`);
    }
    
    console.log('\n📋 Все репозитории:');
    accounts.forEach(account => {
        console.log(`\n${account.name}:`);
        repoNames.forEach(repo => {
            console.log(`  🔗 https://github.com/${account.name}/${repo}`);
        });
    });
}

deployToAll();