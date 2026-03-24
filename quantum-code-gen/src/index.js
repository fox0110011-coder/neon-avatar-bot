/**
 * Quantum Code Generator - Main Entry
 */

import { QuantumEngine } from './quantum.js';
import { CodeGenerator } from './generator.js';
import { AIAnalyzer } from './analyzer.js';

class QuantumCodeGen {
    constructor() {
        this.quantum = new QuantumEngine();
        this.generator = new CodeGenerator();
        this.analyzer = new AIAnalyzer();
    }
    
    async start() {
        console.log('⚛️ Quantum Code Generator запущен!');
        console.log('🔮 Инициализация квантовых алгоритмов...');
        
        await this.quantum.initialize();
        await this.generator.setup();
        
        console.log('✨ Система готова к генерации кода');
        
        await this.demo();
    }
    
    async demo() {
        console.log('\n🚀 Демонстрация возможностей...');
        
        const tasks = [
            { lang: 'javascript', type: 'component', complexity: 'medium' },
            { lang: 'python', type: 'algorithm', complexity: 'high' },
            { lang: 'rust', type: 'system', complexity: 'expert' }
        ];
        
        for (const task of tasks) {
            console.log(`\n⚛️ Генерируем ${task.type} на ${task.lang}...`);
            
            const quantumState = await this.quantum.createSuperposition(task);
            const code = await this.generator.generate(quantumState);
            const analysis = await this.analyzer.analyze(code);
            
            console.log(`✅ Код сгенерирован (качество: ${analysis.quality}%)`);
        }
    }
}

const app = new QuantumCodeGen();
app.start().catch(console.error);