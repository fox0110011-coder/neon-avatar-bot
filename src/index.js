/**
 * Pollination Flow Manager
 * Главный файл для работы с Pollination API
 */

import { PollinationClient } from './client.js';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    try {
        const client = new PollinationClient();
        
        console.log('🌟 Pollination Flow Manager запущен!');
        
        // Получаем список проектов
        const projects = await client.getProjects();
        console.log(`📁 Найдено проектов: ${projects.length}`);
        
        // Пример создания проекта
        if (projects.length === 0) {
            console.log('🔨 Создаем тестовый проект...');
            const newProject = await client.createProject({
                name: 'Test Flow Project',
                description: 'Тестовый проект для демонстрации'
            });
            console.log(`✅ Проект создан: ${newProject.name}`);
        }
        
    } catch (error) {
        console.error('❌ Ошибка:', error.message);
    }
}

// Запускаем только если файл вызван напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}