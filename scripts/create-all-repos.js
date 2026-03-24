/**
 * Создание всех 20 репозиториев (5 названий × 4 аккаунта)
 */

import axios from 'axios';

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

async function createRepository(account, repoName) {
    console.log(`🔨 Создаем ${repoName} для ${account.name}...`);
    
    try {
        const response = await axios.post(
            'https://api.github.com/user/repos',
            {
                name: repoName,
                description: `🚀 ${repoName} - Automated project deployment`,
                private: false,
                auto_init: false
            },
            {
                headers: {
                    'Authorization': `token ${account.token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Multi-Repo-Manager'
                }
            }
        );
        
        console.log(`✅ ${repoName} создан для ${account.name}`);
        return true;
        
    } catch (error) {
        if (error.response?.status === 422) {
            console.log(`ℹ️  ${repoName} уже существует для ${account.name}`);
            return true;
        } else {
            console.error(`❌ Ошибка создания ${repoName} для ${account.name}:`, error.response?.data || error.message);
            return false;
        }
    }
}

async function createAllRepositories() {
    console.log('🚀 Создание всех 20 репозиториев...');
    console.log('=' .repeat(60));
    
    let created = 0;
    let total = accounts.length * repoNames.length;
    
    for (const account of accounts) {
        console.log(`\n👤 Аккаунт: ${account.name}`);
        console.log('-'.repeat(60));
        
        for (const repoName of repoNames) {
            const success = await createRepository(account, repoName);
            if (success) created++;
            
            // Пауза между запросами
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`✨ Создание завершено: ${created}/${total} репозиториев`);
    console.log('\n📋 Список репозиториев:');
    
    accounts.forEach(account => {
        console.log(`\n${account.name}:`);
        repoNames.forEach(repo => {
            console.log(`  🔗 https://github.com/${account.name}/${repo}`);
        });
    });
}

createAllRepositories();