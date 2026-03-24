/**
 * Модели данных для работы с Pollination
 */

export class Project {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description || '';
        this.owner = data.owner;
        this.createdAt = new Date(data.created_at);
        this.updatedAt = new Date(data.updated_at);
    }
    
    toString() {
        return `Project(${this.name} - ${this.id})`;
    }
}

export class Job {
    constructor(data) {
        this.id = data.id;
        this.projectId = data.project_id;
        this.recipeId = data.recipe_id;
        this.status = data.status; // queued, running, completed, failed
        this.inputs = data.inputs || {};
        this.outputs = data.outputs || null;
        this.createdAt = new Date(data.created_at);
        this.startedAt = data.started_at ? new Date(data.started_at) : null;
        this.completedAt = data.completed_at ? new Date(data.completed_at) : null;
        this.errorMessage = data.error_message || null;
    }
    
    isCompleted() {
        return this.status === 'completed';
    }
    
    isFailed() {
        return this.status === 'failed';
    }
    
    isRunning() {
        return this.status === 'running';
    }
    
    toString() {
        return `Job(${this.id} - ${this.status})`;
    }
}

export class Recipe {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description || '';
        this.version = data.version;
        this.inputs = data.inputs || [];
        this.outputs = data.outputs || [];
    }
    
    toString() {
        return `Recipe(${this.name} v${this.version})`;
    }
}