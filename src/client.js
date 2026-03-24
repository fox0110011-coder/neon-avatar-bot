/**
 * Клиент для работы с Pollination API
 * Версия 1.1.0 - Оптимизированная обработка запросов
 */

import axios from 'axios';

export class PollinationClient {
    constructor(options = {}) {
        this.apiKey = options.apiKey || process.env.POLLINATION_API_KEY;
        this.baseURL = options.baseURL || process.env.POLLINATION_BASE_URL || 'https://api.pollination.cloud';
        
        if (!this.apiKey) {
            throw new Error('API ключ обязателен. Укажите POLLINATION_API_KEY в .env файле');
        }
        
        // Создание HTTP клиента с настройками
        this.client = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });
        
        // Перехватчик для обработки ошибок
        this.client.interceptors.response.use(
            response => response,
            error => {
                console.error('API Error:', error.response?.data || error.message);
                throw error;
            }
        );
    }
    
    /**
     * Получить список проектов
     */
    async getProjects() {
        try {
            const response = await this.client.get('/projects');
            return response.data;
        } catch (error) {
            throw new Error(`Ошибка получения проектов: ${error.message}`);
        }
    }
    
    /**
     * Получить информацию о проекте
     */
    async getProject(projectId) {
        try {
            const response = await this.client.get(`/projects/${projectId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Ошибка получения проекта ${projectId}: ${error.message}`);
        }
    }
    
    /**
     * Создать новый проект
     */
    async createProject(projectData) {
        try {
            const response = await this.client.post('/projects', projectData);
            return response.data;
        } catch (error) {
            throw new Error(`Ошибка создания проекта: ${error.message}`);
        }
    }
    
    /**
     * Получить список задач проекта
     */
    async getJobs(projectId) {
        try {
            const response = await this.client.get(`/projects/${projectId}/jobs`);
            return response.data;
        } catch (error) {
            throw new Error(`Ошибка получения задач проекта ${projectId}: ${error.message}`);
        }
    }
    
    /**
     * Отправить задачу на выполнение
     */
    async submitJob(projectId, jobData) {
        try {
            const response = await this.client.post(`/projects/${projectId}/jobs`, jobData);
            return response.data;
        } catch (error) {
            throw new Error(`Ошибка отправки задачи: ${error.message}`);
        }
    }
    
    /**
     * Получить статус задачи
     */
    async getJobStatus(projectId, jobId) {
        try {
            const response = await this.client.get(`/projects/${projectId}/jobs/${jobId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Ошибка получения статуса задачи ${jobId}: ${error.message}`);
        }
    }
    
    /**
     * Получить результаты задачи
     */
    async getJobResults(projectId, jobId) {
        try {
            const response = await this.client.get(`/projects/${projectId}/jobs/${jobId}/results`);
            return response.data;
        } catch (error) {
            throw new Error(`Ошибка получения результатов задачи ${jobId}: ${error.message}`);
        }
    }
}