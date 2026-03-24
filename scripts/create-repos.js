/**
 * Скрипт для создания репозиториев на GitHub через API
 */

import axios from 'axios';

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

async function createRepository(account) {
    console.log(`🔨 Создаем репозиторий для ${account.name}...`);
    
    try {
        const response = await axios.post(
            'https://api.github.com/user/repos',
            {
                name: account.repo,
                description: '🌟 Простой менеджер для работы с платформой Pollination',
                private: false,
                auto_init: false
            },
            {
                headers: {
                    'Authorization': `token ${account.token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Pollination-Flow-Manager'
                }
            }
        );
        
        console.log(`✅ Репозиторий создан: https://github.com/${account.name}/${account.repo}`);
        return true;
        
    } catch (error) {
        if (error.response?.status === 422) {
            console.log(`ℹ️  Репозиторий ${account.repo} уже существует для ${account.name}`);
            return true;
        } else {
            console.error(`❌ Ошибка создания репозитория для ${account.name}:`, error.response?.data || error.message);
            return false;
        }
    }
}

async function createAllRepositories() {
    console.log('🚀 Создание репозиториев на GitHub...');
    console.log('=' .repeat(50));
    
    for (const account of accounts) {
        await createRepository(account);
        // Небольшая пауза между запросами
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n✨ Создание репозиториев завершено!');
}

createAllRepositories();