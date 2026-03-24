/**
 * Базовый пример использования Pollination Flow Manager
 */

import { PollinationClient } from '../src/client.js';
import { Project, Job } from '../src/models.js';
import dotenv from 'dotenv';

dotenv.config();

async function basicExample() {
    console.log('🚀 Запуск базового примера...');
    
    try {
        const client = new PollinationClient();
        
        // 1. Получаем список проектов
        console.log('\n📋 Получаем список проектов...');
        const projectsData = await client.getProjects();
        const projects = projectsData.map(p => new Project(p));
        
        console.log(`Найдено проектов: ${projects.length}`);
        projects.forEach(project => {
            console.log(`  - ${project.name} (${project.id})`);
        });
        
        // 2. Создаем новый проект если нет существующих
        let targetProject;
        if (projects.length === 0) {
            console.log('\n🔨 Создаем новый проект...');
            const newProjectData = await client.createProject({
                name: 'Flow Test Project',
                description: 'Тестовый проект для демонстрации возможностей'
            });
            targetProject = new Project(newProjectData);
            console.log(`✅ Проект создан: ${targetProject.name}`);
        } else {
            targetProject = projects[0];
            console.log(`\n🎯 Используем существующий проект: ${targetProject.name}`);
        }
        
        // 3. Получаем задачи проекта
        console.log('\n📊 Получаем задачи проекта...');
        const jobsData = await client.getJobs(targetProject.id);
        const jobs = jobsData.map(j => new Job(j));
        
        console.log(`Найдено задач: ${jobs.length}`);
        jobs.forEach(job => {
            console.log(`  - ${job.id} (${job.status})`);
        });
        
        console.log('\n✨ Пример выполнен успешно!');
        
    } catch (error) {
        console.error('❌ Ошибка в примере:', error.message);
    }
}

// Запускаем пример
basicExample();