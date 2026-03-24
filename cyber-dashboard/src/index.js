/**
 * Cyber Dashboard - Main Server
 */

import { DashboardServer } from './server.js';
import { MetricsEngine } from './metrics.js';
import { UIRenderer } from './ui.js';

class CyberDashboard {
    constructor() {
        this.server = new DashboardServer();
        this.metrics = new MetricsEngine();
        this.ui = new UIRenderer();
        this.port = process.env.PORT || 3000;
    }
    
    async start() {
        console.log('🚀 Cyber Dashboard запускается...');
        console.log('🎮 Инициализация киберпанк интерфейса...');
        
        await this.server.initialize();
        await this.metrics.start();
        await this.ui.render();
        
        console.log(`✨ Dashboard доступен на http://localhost:${this.port}`);
        console.log('🔥 Система мониторинга активна');
        
        this.startDemo();
    }
    
    startDemo() {
        console.log('\n📊 Демонстрация метрик...');
        
        setInterval(() => {
            const metrics = this.metrics.generateRandomMetrics();
            console.log(`CPU: ${metrics.cpu}% | RAM: ${metrics.ram}% | Network: ${metrics.network} MB/s`);
        }, 2000);
    }
}

const dashboard = new CyberDashboard();
dashboard.start().catch(console.error);