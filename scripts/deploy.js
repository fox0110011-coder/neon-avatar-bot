/**
 * Скрипт для автоматического деплоя на несколько GitHub аккаунтов
 */

import { execSync } from 'child_process';
import fs from 'fs';

// Конфигурация аккаунтов
const accounts = [
    {
        name: 'fox0110011-coder',
        token: process.env.GITHUB_TOKEN_1 || 'your_token_here',
        repo: 'pollination-flow-manager'
    },
    {
        name: 'ozehefageza031-rgb',
        token: process.env.GITHUB_TOKEN_2 || 'your_token_here',
        repo: 'pollination-flow-manager'
    },
    {
        name: 'ang3l043k018-cmyk',
        token: process.env.GITHUB_TOKEN_3 || 'your_token_here',
        repo: 'pollination-flow-manager'
    }
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

function initGitRepo() {
    console.log('\n🚀 Инициализация Git репозитория...');
    
    // Проверяем, есть ли уже .git
    if (!fs.existsSync('.git')) {
        executeCommand('git init', 'Инициализация Git');
    }
    
    executeCommand('git add .', 'Добавление файлов');
    
    try {
        executeCommand('git commit -m "Initial commit: Pollination Flow Manager"', 'Создание коммита');
    } catch (error) {
        console.log('ℹ️  Коммит уже существует или нет изменений');
    }
}

async function deployToAccount(account) {
    console.log(`\n🎯 Деплой на аккаунт: ${account.name}`);
    
    const remoteUrl = `https://${account.name}:${account.token}@github.com/${account.name}/${account.repo}.git`;
    const remoteName = `origin-${account.name}`;
    
    try {
        // Удаляем remote если существует
        try {
            executeCommand(`git remote remove ${remoteName}`, `Удаление старого remote ${remoteName}`);
        } catch (error) {
            // Игнорируем ошибку если remote не существует
        }
        
        // Добавляем новый remote
        executeCommand(`git remote add ${remoteName} ${remoteUrl}`, `Добавление remote ${remoteName}`);
        
        // Пушим на аккаунт
        executeCommand(`git push -u ${remoteName} main --force`, `Push на ${account.name}`);
        
        console.log(`✅ Успешно задеплоено на ${account.name}`);
        console.log(`🔗 Репозиторий: https://github.com/${account.name}/${account.repo}`);
        
    } catch (error) {
        console.error(`❌ Ошибка деплоя на ${account.name}:`, error.message);
    }
}

async function deployToAll() {
    console.log('🌟 Pollination Flow Manager - Автоматический деплой');
    console.log('=' .repeat(50));
    
    try {
        // Инициализируем Git репозиторий
        initGitRepo();
        
        // Деплоим на все аккаунты
        for (const account of accounts) {
            await deployToAccount(account);
        }
        
        console.log('\n🎉 Деплой завершен на все аккаунты!');
        console.log('\n📋 Ссылки для быстрого push:');
        accounts.forEach(account => {
            const pushUrl = `https://${account.name}:${account.token}@github.com/${account.name}/${account.repo}.git`;
            console.log(`\n${account.name}:`);
            console.log(`git push ${pushUrl}`);
        });
        
    } catch (error) {
        console.error('\n💥 Критическая ошибка деплоя:', error.message);
        process.exit(1);
    }
}

// Запускаем деплой
deployToAll();