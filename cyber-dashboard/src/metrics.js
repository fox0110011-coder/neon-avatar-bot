/**
 * Metrics Engine
 */

export class MetricsEngine {
    constructor() {
        this.metrics = {
            cpu: [],
            memory: [],
            network: [],
            disk: []
        };
        this.maxHistory = 100;
    }
    
    async start() {
        console.log('📊 Запуск системы метрик...');
        
        this.startCollection();
        console.log('✅ Сбор метрик активен');
    }
    
    startCollection() {
        setInterval(() => {
            const newMetrics = this.generateRandomMetrics();
            this.addMetrics(newMetrics);
        }, 1000);
    }
    
    generateRandomMetrics() {
        return {
            cpu: Math.floor(Math.random() * 100),
            memory: Math.floor(Math.random() * 100),
            network: Math.floor(Math.random() * 1000),
            disk: Math.floor(Math.random() * 100),
            timestamp: Date.now()
        };
    }
    
    addMetrics(metrics) {
        Object.keys(metrics).forEach(key => {
            if (key !== 'timestamp' && this.metrics[key]) {
                this.metrics[key].push({
                    value: metrics[key],
                    timestamp: metrics.timestamp
                });
                
                // Ограничиваем историю
                if (this.metrics[key].length > this.maxHistory) {
                    this.metrics[key].shift();
                }
            }
        });
    }
    
    getMetrics(type, limit = 50) {
        return this.metrics[type]?.slice(-limit) || [];
    }
    
    getAllMetrics() {
        return this.metrics;
    }
    
    getAverages() {
        const averages = {};
        
        Object.keys(this.metrics).forEach(key => {
            const values = this.metrics[key].map(m => m.value);
            averages[key] = values.length > 0 
                ? values.reduce((a, b) => a + b, 0) / values.length 
                : 0;
        });
        
        return averages;
    }
}